export class AllocationsAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/allocations
    async List() {
        const response = await this.core.makeRequest("GET", "allocations");
        const data = await response.json();
        return data;
    }
    // [PUT] /api/client/servers/<UUID>/allocations/<ID>
    async Update(id) {
        return await this.core.makeRequest("PUT", `allocations/${id}`);
    }
}
