/**
 * Handles interfacing with the Subusers API
 *
 * @public
 */
export class SubusersAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Lists all Subusers for the Server
     *
     * @public
     */
    async List() {
        const response = await this.core.makeRequest("GET", "subusers", { include: "user" });
        const data = await response.json();
        return data;
    }
    /**
     * Retrieves the details for the Subuser
     *
     * @param id The ID of the Subuser
     *
     * @public
     */
    async GetDetails(id) {
        const response = await this.core.makeRequest("GET", `subusers/${id}`, { include: "user" });
        const data = await response.json();
        return data;
    }
    /**
     * Get all permissions available to Subusers
     *
     * @public
     */
    async GetAllPermissions() {
        const response = await this.core.makeRequest("GET", "subusers/permissions");
        const data = await response.json();
        return data;
    }
    /**
     * Creates a new Subuser
     *
     * @param email The email for the Subuser
     * @param permissions The Permissions to grant to the Subuser
     *
     * @public
     */
    async Create(email, permissions) {
        const requestData = {
            email: email,
            permissions: permissions
        };
        const response = await this.core.makeRequest("POST", "subusers", requestData);
        const data = await response.json();
        return data;
    }
    /**
     * Updates the Subuser
     *
     * @param id The ID of the Subuser
     * @param email The new email of the Subuser
     * @param permissions The new permissions for the Subuser
     *
     * @public
     */
    async Update(id, email, permissions) {
        const data = {
            email: email,
            permissions: permissions
        };
        const response = await this.core.makeRequest("PATCH", `subusers/${id}`, data);
        const responseData = await response.json();
        return responseData;
    }
    /**
     * Deletes the Subuser
     *
     * @param id The ID of the Subuser
     *
     * @public
     */
    async Delete(id) {
        await this.core.makeRequest("DELETE", `subusers/${id}`);
    }
}
