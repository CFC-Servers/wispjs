export class ModsAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/mods
    async List(search = null) {
        const searchStruct = search ? { search: search } : null;
        const response = await this.core.makeRequest("GET", "mods", searchStruct);
        const data = await response.json();
        return data;
    }
    // [POST] /api/client/servers/<UUID>/mods/<ID>
    async Install(id) {
        return await this.core.makeRequest("POST", `mods/${id}`);
    }
}
