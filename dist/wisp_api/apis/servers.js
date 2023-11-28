export class ServersAPI {
    constructor(core) {
        this.core = core;
    }
    // [POST] /api/client/servers/<UUID>/command
    async SendCommand(command) {
        await this.core.makeRequest("POST", "command", { command: command });
    }
    // [GET] api/client/servers/<UUID>/details
    async GetWebsocketDetails() {
        const response = await this.core.makeRequest("GET", "websocket");
        return await response.json();
    }
    // [PATCH] /api/client/servers/<UUID>/details
    async SetName(name) {
        const response = await this.core.makeRequest("PATCH", "details", { name: name });
        return await response.json();
    }
    // [GET] /api/client/servers/<UUID>
    async GetDetails() {
        const response = await this.core.makeRequest("GET", "");
        return await response.json();
    }
    // [GET] /api/client/servers/<UUID>/resources
    async GetResources() {
        const response = await this.core.makeRequest("GET", "resources");
        return await response.json();
    }
    // [POST] /api/client/servers/<UUID>/power
    async PowerRequest(action) {
        await this.core.makeRequest("POST", "power", { signal: action });
    }
}
