export class FastDLAPI {
    constructor(core) {
        this.core = core;
    }
    // [POST] /api/client/servers/<UUID>/fastdl
    async Sync() {
        return await this.core.makeRequest("POST", "fastdl");
    }
}
