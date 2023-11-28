export class ServersAPI {
    constructor(core) {
        this.core = core;
    }
    // [POST] /api/client/servers/<UUID>/command
    async SendCommand(command) {
        try {
            const response = await this.core.makeRequest("POST", "command", { command: command });
            return response.ok;
        }
        catch (error) {
            this.core.logger.error(`Failed to send command: ${error}`);
            return false;
        }
    }
    // [GET] api/client/servers/<UUID>/details
    async GetWebsocketDetails() {
        const response = await this.core.makeRequest("GET", "websocket");
        console.log("Got websocket details response", response);
        return await response.json();
    }
    // [PATCH] /api/client/servers/<UUID>/details
    async SetName(name) {
        return await this.core.makeRequest("PATCH", "details", { name: name });
    }
    // [GET] /api/client/servers/<UUID>
    async GetDetails() {
        return await this.core.makeRequest("GET", "");
    }
    // [GET] /api/client/servers/<UUID>/resources
    async GetResources() {
        return await this.core.makeRequest("GET", "resources");
    }
    // [POST] /api/client/servers/<UUID>/power
    async PowerRequest(action) {
        return await this.core.makeRequest("POST", "power", { signal: action });
    }
}
