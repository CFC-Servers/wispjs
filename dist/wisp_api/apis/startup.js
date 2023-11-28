/**
 * Handles interaction with Server Startup information
 *
 * @public
 */
export class StartupAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Gets all Startup details for the Server
     *
     * @public
     */
    async Get() {
        const response = await this.core.makeRequest("GET", "startup");
        const startupDetails = await response.json();
        return startupDetails;
    }
    /**
     * Updates the Startup details for the Server
     *
     * @remarks
     * ℹ️  Pass the variables with their new value to update them. Response will contain the new updated startup
     *
     * @param startup The Startup values to update
     *
     * @public
     */
    async Update(startup) {
        const response = await this.core.makeRequest("PUT", "startup", startup);
        const data = await response.json();
        return data;
    }
}
