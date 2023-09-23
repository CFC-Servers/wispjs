export class DatabasesAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/databases
    async List() {
        const response = await this.core.makeRequest("GET", "databases", { include: "hosts" });
        const data = await response.json();
        return data;
    }
    // TODO: verify response
    // [DELETE] /api/client/servers/<UUID>/databases/<ID>
    async Delete(id) {
        return await this.core.makeRequest("DELETE", `databases/${id}`);
    }
    // TODO: Verify response
    // [POST] /api/client/servers/<UUID>/databases/<ID>/rotate-password
    async RotatePassword(id) {
        return await this.core.makeRequest("POST", `databases/${id}`);
    }
}
