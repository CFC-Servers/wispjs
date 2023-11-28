export class StartupAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/startup
    async Get() {
        const response = await this.core.makeRequest("GET", "startup");
        const startupDetails = await response.json();
        return startupDetails;
    }
    // [PUT] /api/client/servers/<UUID>/startup
    // "Pass the variables with their new value to update them. Response will contain the new updated startup."
    async Update(startup) {
        return await this.core.makeRequest("PUT", "startup", startup);
    }
}
