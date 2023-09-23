export class AuditLogsAPI {
    constructor(core) {
        this.core = core;
    }
    // TODO: Handle pagination
    // [GET] /api/client/servers/<UUID>/audit-logs
    async List() {
        const response = await this.core.makeRequest("GET", "audit-logs");
        const data = await response.json();
        return data;
    }
}
