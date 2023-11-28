/**
 * Interface that handles Listing of all Audit Logs
 *
 * @public
 */
export class AuditLogsAPI {
    constructor(core) {
        this.core = core;
    }
    // TODO: Handle pagination
    /**
     * List all Audit Log events for the server
     *
     * @public
     */
    async List() {
        const response = await this.core.makeRequest("GET", "audit-logs");
        const data = await response.json();
        return data;
    }
}
