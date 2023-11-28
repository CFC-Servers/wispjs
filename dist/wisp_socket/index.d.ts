import { Socket } from "socket.io-client";
/**
 * The struct sent from the server containing console messages
 *
 * @param type The type of message. Currently unknown what varients exist
 * @param line The actual content of the console messages
 *
 * @internal
 */
export type ConsoleMessage = {
    type: string;
    line: string;
};
/**
 * Struct used to initiate a Git Clone action
 *
 * @param dir The directory to clone into
 * @param url The HTTPS URL to clone
 * @param branch The repository branch
 * @param authkey The authentication key to use when pulling
 *
 * @internal
 */
export type GitCloneData = {
    dir: string;
    url: string;
    branch: string;
    authkey?: string | undefined;
};
/**
 * Return struct after finishing a Git Clone action
 *
 * @param isPrivate Whether or not the repository is private
 *
 * @internal
 */
export type GitCloneResult = {
    isPrivate: boolean;
};
/**
 * Struct used to initiate a Git Pull action
 *
 * @param dir The directory to pull
 * @param authkey The authentication key to use when pulling
 *
 * @internal
 */
export type GitPullData = {
    dir: string;
    authkey?: string;
};
/**
 * Struct returned after a Git Pull action finishes
 *
 * @param output The actual output
 * @param isPrivate Whether or not the repository is private
 *
 * @internal
 */
export type GitPullResult = {
    output: string;
    isPrivate: boolean;
};
/**
 * An individual filesearch result
 *
 * @param results How many results are present in the file
 * @param lines A map of line numbers to their contents. These lines include nearby context of matched lines
 *
 * @internal
 */
export type FilesearchFile = {
    results: number;
    lines: {
        [key: string]: string;
    };
};
/**
 * The results of a file search
 *
 * @param files A map of file names to matched+context lines within each file
 * @param tooMany Whether or not there were too many results to display
 *
 * @internal
 */
export type FilesearchResults = {
    files: {
        [key: string]: FilesearchFile;
    };
    tooMany: boolean;
};
export type ServerToClientEvents = {
    "error": (message: string) => void;
    "auth_success": (message: string) => void;
    "filesearch-results": (data: FilesearchResults) => void;
    "git-error": (data: string) => void;
    "git-success": (message?: string) => void;
    "git-clone": (data: GitCloneData) => void;
    "git-pull": (data: GitPullData) => void;
    "console": (message: ConsoleMessage) => void;
};
export type ClientToServerEvents = {
    "auth": (token: string) => void;
    "filesearch-start": (query: string) => void;
    "git-clone": (data: GitCloneData) => void;
    "git-pull": (data: GitPullData) => void;
    "send command": (command: string) => void;
};
/**
 * The Websocket information returned from the API
 *
 * @param token The token to use when authenticating with the `auth` command in the Websocket
 * @param url The actual URL of the Websocket
 *
 * @internal
 */
export type WebsocketInfo = {
    token: string;
    url: string;
};
export type WebsocketDetailsPreprocessor = (info: WebsocketInfo) => void;
export interface WispSocket {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    logger: any;
    api: any;
    url: string;
    token: string;
    ghToken: string;
    _websocketDetailsPreprocessor: WebsocketDetailsPreprocessor | undefined;
}
/**
 * The primary interface to the Websocket API
 *
 * @internal
 */
export declare class WispSocket {
    constructor(logger: any, api: any, ghToken: string);
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
    setWebsocketDetailsPreprocessor(preprocessor: WebsocketDetailsPreprocessor): void;
    /**
     * Requests and saves the Websocket details from the API
     *
     * @internal
     */
    setDetails(): Promise<void>;
    /**
     * Establishes the actual Websocket connection and initializes the event listeners
     *
     * @internal
     */
    _connect(): Promise<void>;
    /**
     * Sets the Websocket details and initializes the Websocket connection
     *
     * @internal
     */
    connect(): Promise<void>;
    /**
     * Disconnects from the websocket
     *
     * @internal
     */
    disconnect(): Promise<void>;
    /**
     * Searches all file contents for the given query
     *
     * @param query The query string to search for
     *
     * @public
     */
    filesearch(query: string): Promise<FilesearchResults>;
    /**
     * Performs a git pull operation on the given directory
     *
     * @param dir The full directory path to perform a pull on
     *
     * @public
     */
    gitPull(dir: string): Promise<GitPullResult>;
    /**
     * Clones a new Repo to the given directory
     *
     * @param url The HTTPS URL of the repository
     * @param dir The full path of the directory to clone the repository to
     * @param branch The branch of the repository to clone
     *
     * @public
     */
    gitClone(url: string, dir: string, branch: string): Promise<GitCloneResult>;
    /**
     * Adds a new callback that will run any time a console message is rececived
     *
     * @param callback The callback to run, takes a single param, `message`, a string
     *
     * @public
     */
    addConsoleListener(callback: (message: string) => void): void;
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
    sendCommandNonce(nonce: string, command: string, timeout?: number): Promise<string>;
}
