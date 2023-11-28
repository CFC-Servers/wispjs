/**
 * Handles the listing and updating of a Server's IP/Port Allocations
 *
 * @public
 */
export class AllocationsAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Lists all Allocations for the Server
     *
     * @public
     */
    async List() {
        const response = await this.core.makeRequest("GET", "allocations");
        const data = await response.json();
        return data;
    }
    /**
     * Sets the new primary Allocation for the server
     *
     * @param id Allocation ID of the new primary allocation
     *
     * @public
     */
    async Update(id) {
        const response = await this.core.makeRequest("PUT", `allocations/${id}`);
        const data = await response.json();
        return data;
    }
}
