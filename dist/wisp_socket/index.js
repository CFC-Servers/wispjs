import { io } from "socket.io-client";
// TODO: Handle errors better
// TODO: Allow for no ghToken
// TODO: Don't require a logger
/**
 * The primary interface to the Websocket API
 *
 * @internal
 */
export class WispSocket {
    constructor(logger, api, ghToken) {
        this.logger = logger;
        this.api = api;
        this.ghToken = ghToken;
        this.url = "";
        this.token = "";
    }
    /**
     * Sets a callback to run on the Websocket Info before saving the details.
     *
     * @remarks
     * ℹ️  This can be used to modify the URL or token after its retrieved from the API
     *
     * @param preprocessor The callback to run when the data is received from the API
     *
     * @public
     */
    setWebsocketDetailsPreprocessor(preprocessor) {
        this._websocketDetailsPreprocessor = preprocessor;
    }
    /**
     * Requests and saves the Websocket details from the API
     *
     * @internal
     */
    setDetails() {
        return new Promise((resolve, reject) => {
            this.api.getWebsocketDetails().then((websocketInfo) => {
                if (this._websocketDetailsPreprocessor) {
                    this._websocketDetailsPreprocessor(websocketInfo);
                }
                this.url = websocketInfo.url;
                this.token = websocketInfo.token;
                this.logger.info(`Got Websocket Details`);
                resolve();
            }).catch((err) => {
                this.logger.error(`Failed to get websocket details: ${err}`);
                reject(err);
            });
        });
    }
    /**
     * Establishes the actual Websocket connection and initializes the event listeners
     *
     * @internal
     */
    _connect() {
        let reconnectDelay = 1;
        return new Promise((resolve, reject) => {
            let connectedFirst = false;
            console.log("Connecting to WebSocket");
            this.socket = io(this.url, {
                forceNew: true,
                transports: ["websocket"],
                extraHeaders: {
                    "Authorization": `Bearer ${this.token}`
                },
                addTrailingSlash: true
            });
            this.socket.on("connect", () => {
                console.log("Connected to WebSocket");
                this.socket.emit("auth", this.token);
            });
            this.socket.on("error", (reason) => {
                console.error(`WebSocket error: ${reason}`);
            });
            this.socket.on("connect_error", (error) => {
                console.error(`WebSocket Connect error: ${error.toString()}`);
                if (!connectedFirst) {
                    connectedFirst = true;
                    reject();
                }
            });
            this.socket.on("disconnect", (reason) => {
                console.error(`Disconnected from WebSocket: ${reason}`);
                if (reason === "io server disconnect") {
                    console.error(`Server closed connection - retrying (delay: ${reconnectDelay})`);
                    setTimeout(() => {
                        reconnectDelay = reconnectDelay * 1.2;
                        this.setDetails().then(() => {
                            this.socket.connect();
                        });
                    }, reconnectDelay * 1000);
                }
            });
            this.socket.on("auth_success", () => {
                console.log("Auth success");
                if (!connectedFirst) {
                    connectedFirst = true;
                    resolve();
                }
            });
            setTimeout(() => {
                if (!connectedFirst) {
                    console.error("Socket didn't connect in time");
                    reject();
                }
            }, 5000);
            console.log("Sent socket.connect()");
        });
    }
    /**
     * Sets the Websocket details and initializes the Websocket connection
     *
     * @internal
     */
    async connect() {
        await this.setDetails();
        await this._connect();
    }
    /**
     * Disconnects from the websocket
     *
     * @internal
     */
    disconnect() {
        return new Promise((resolve, reject) => {
            let done = false;
            this.socket.once("disconnect", () => {
                if (!done) {
                    done = true;
                    resolve();
                }
            });
            this.socket.disconnect();
            setTimeout(() => {
                if (!done) {
                    console.error("Socket didn't disconnect in time");
                    done = true;
                    reject();
                }
            }, 5000);
        });
    }
    /**
     * Searches all file contents for the given query
     *
     * @param query The query string to search for
     *
     * @public
     */
    filesearch(query) {
        return new Promise((resolve, reject) => {
            let done = false;
            this.socket.once("filesearch-results", (data) => {
                done = true;
                resolve(data);
            });
            this.socket.emit("filesearch-start", query);
            setTimeout(() => {
                if (!done) {
                    reject("Timeout");
                }
            }, 10000);
        });
    }
    /**
     * Performs a git pull operation on the given directory
     *
     * @param dir The full directory path to perform a pull on
     *
     * @public
     */
    gitPull(dir) {
        return new Promise((resolve, reject) => {
            let isPrivate = false;
            const finished = (success, output) => {
                this.socket.removeAllListeners("git-pull");
                this.socket.removeAllListeners("git-error");
                this.socket.removeAllListeners("git-success");
                const result = {
                    output: output,
                    isPrivate: isPrivate
                };
                if (success) {
                    resolve(result);
                }
                else {
                    reject(output);
                }
            };
            const sendRequest = (includeAuth = false) => {
                const data = { dir: dir };
                if (includeAuth) {
                    isPrivate = true;
                    data.authkey = this.ghToken;
                }
                this.socket.emit("git-pull", data);
            };
            this.socket.once("git-pull", (data) => {
                this.logger.info(`Updating ${data}`);
            });
            this.socket.once("git-success", (commit) => {
                this.logger.info(`Addon updated to ${commit}`);
                if (!commit) {
                    this.logger.info("No commit given!");
                }
                finished(true, commit || "");
            });
            this.socket.on("git-error", (message) => {
                if (message === "Remote authentication required but no callback set") {
                    this.logger.info(`Remote authentication required, trying again with authkey: ${dir}`);
                    sendRequest(true);
                }
                else {
                    this.logger.error(`Error updating addon: ${message}`);
                    finished(false, message);
                }
            });
            sendRequest();
        });
    }
    /**
     * Clones a new Repo to the given directory
     *
     * @param url The HTTPS URL of the repository
     * @param dir The full path of the directory to clone the repository to
     * @param branch The branch of the repository to clone
     *
     * @public
     */
    gitClone(url, dir, branch) {
        return new Promise((resolve, reject) => {
            let isPrivate = false;
            const finished = (success, message) => {
                this.socket.removeAllListeners("git-clone");
                this.socket.removeAllListeners("git-error");
                this.socket.removeAllListeners("git-success");
                if (success) {
                    const result = {
                        isPrivate: isPrivate
                    };
                    resolve(result);
                }
                else {
                    reject(message);
                }
            };
            const sendRequest = (includeAuth = false) => {
                const data = { dir: dir, url: url, branch: branch };
                if (includeAuth) {
                    isPrivate = true;
                    data.authkey = this.ghToken;
                }
                this.socket.emit("git-clone", data);
            };
            this.socket.once("git-clone", (data) => {
                this.logger.info(`Cloning ${data}`);
            });
            this.socket.once("git-success", () => {
                this.logger.info("Project successfully cloned");
                finished(true);
            });
            this.socket.on("git-error", (message) => {
                if (message === "Remote authentication required but no callback set") {
                    this.logger.info(`Remote authentication required, trying again with authkey: ${dir}`);
                    sendRequest(true);
                }
                else {
                    this.logger.info(`Error cloning repo: ${message}`);
                    finished(false, message);
                }
            });
            sendRequest();
        });
    }
    // TODO: Should we maintain or own listener chain?
    // TODO: Create a way to remove listeners
    /**
     * Adds a new callback that will run any time a console message is rececived
     *
     * @param callback The callback to run, takes a single param, `message`, a string
     *
     * @public
     */
    addConsoleListener(callback) {
        this.socket.on("console", (data) => {
            callback(data.line);
        });
    }
    /**
     * Sends a command to the server and then waits until output with the given prefix is seen in a console message
     *
     * @example
     * Runs a custom lua command that will prefix its output with our nonce, then prints the output from that command
     * ```lua
     * -- lua/autorun/server/nonce_example.lua
     * concommand.Add( "myCommand", function( ply, _, args )
     *     if IsValid( ply ) then return end
     *
     *     local nonce = args[1]
     *     print( nonce .. "Command output" )
     * end )
     * ```
     * ```js
     * const nonce = "abc123";
     * const command = `myCommand "${nonce}"`;
     * try {
     *     const output = await wisp.socket.sendCommandNonce(nonce, command);
     *     console.log("Output from command:", output);
     * catch (error) {
     *     console.error(error);
     * }
     * ```
     *
     * @remarks
     * ℹ️  This is useful if you run code on your Server that will print output with the same prefix, letting you run commands and also receive output for it
     *
     * @param nonce The short, unique string that your output will be prefixed with
     * @param command The full command string to send
     * @param timeout How long to wait for output before timing out
     *
     * @public
     */
    sendCommandNonce(nonce, command, timeout = 1000) {
        return new Promise((resolve, reject) => {
            let timeoutObj;
            let callback;
            let output = "";
            callback = (data) => {
                const line = data.line;
                if (line.startsWith(nonce)) {
                    const message = line.slice(nonce.length);
                    if (message === "Done.") {
                        this.socket.off("console", callback);
                        clearTimeout(timeoutObj);
                        resolve(output);
                    }
                    else {
                        output += message;
                        timeoutObj.refresh();
                    }
                }
            };
            this.socket.on("console", callback);
            this.socket.emit("send command", command);
            timeoutObj = setTimeout(() => {
                console.error("Command timed out current output: ", output);
                this.socket.off("console", callback);
                reject("Timeout");
            }, timeout);
        });
    }
}
