/**
 * Handles generic Server interaction, such as Sending Commands, managing Power State, and getting Details
 *
 * @public
 */
export class ServersAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Sends a command to the Server
     *
     * @param command The full command string to send to the Server
     *
     * @public
     */
    async SendCommand(command) {
        await this.core.makeRequest("POST", "command", { command: command });
    }
    /**
     * Gets the Websocket connection (and upload) details for the Server
     *
     * @public
     */
    async GetWebsocketDetails() {
        const response = await this.core.makeRequest("GET", "websocket");
        return await response.json();
    }
    /**
     * Sets the name of the Server as it appears in the panel
     * (Same thing as setting the name in the "Server Details" menu)
     *
     * @param name The new name of the server
     *
     * @public
     */
    async SetName(name) {
        const response = await this.core.makeRequest("PATCH", "details", { name: name });
        return await response.json();
    }
    /**
     * Retrieves the basic, technical details of the Server
     *
     * @public
     */
    async GetDetails() {
        const response = await this.core.makeRequest("GET", "");
        return await response.json();
    }
    /**
     * Retrieves technical details of the Server's resources
     * (CPU, Memory, Disk, Network)
     *
     * @public
     */
    async GetResources() {
        const response = await this.core.makeRequest("GET", "resources");
        return await response.json();
    }
    /**
     * Instructs the Server to start up, shut down, restart, or force quit
     *
     * @example
     * Example of stopping the server
     * ```
     * await wisp.api.PowerRequest("stop");
     * ```
     *
     * @param action The power action to send. One of: ["start", "stop", "restart", "kill"]
     *
     * @public
     */
    async PowerRequest(action) {
        await this.core.makeRequest("POST", "power", { signal: action });
    }
}
