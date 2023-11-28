/**
 * Handles Creating, Listing, Updating, and Deleting of Databases for the Server
 *
 * @public
 */
export class DatabasesAPI {
    constructor(core) {
        this.core = core;
    }
    // TODO: Handle Pagination
    /**
     * Lists all Databases associated with the Server
     *
     * @public
     */
    async List() {
        const response = await this.core.makeRequest("GET", "databases", { include: "hosts" });
        const data = await response.json();
        return data;
    }
    // TODO: verify response
    /**
     * Deletes the Database from the Server
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    async Delete(id) {
        return await this.core.makeRequest("DELETE", `databases/${id}`);
    }
    // TODO: Verify response
    /**
     * Rotates the password for the Backup
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    async RotatePassword(id) {
        return await this.core.makeRequest("POST", `databases/${id}`);
    }
}
