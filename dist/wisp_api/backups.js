export class BackupsAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/backups
    async List() {
        const response = await this.core.makeRequest("GET", "backups");
        const data = await response.json();
        return data;
    }
    // TODO: Does this have a response?
    // [POST] /api/client/servers/<UUID>/backups
    async Create(name) {
        return await this.core.makeRequest("POST", "backups", { name: name });
    }
    // [POST] /api/client/servers/<UUID>/backups/<ID>/locked
    async Lock(id) {
        return await this.core.makeRequest("POST", `backups/${id}/locked`);
    }
    // TODO: Erm should we even offer this
    // [POST] /api/client/servers/<UUID>/backups/<ID>/deploy
    async Deploy(id) {
        return await this.core.makeRequest("POST", `backups/${id}/deploy`);
    }
    // [GET] /api/client/servers/<UUID>/backups/ID>/download
    async Download(id) {
        const response = await this.core.makeRequest("GET", `backups/${id}/download`);
        const data = await response.json();
        return data;
    }
    // [DELETE] /api/client/servers/<UUID>/backups/<ID>
    async Delete(id) {
        return await this.core.makeRequest("DELETE", `backups/${id}`);
    }
}
