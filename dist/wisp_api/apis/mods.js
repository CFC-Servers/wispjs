/**
 * Handles Listing and Installating of Mods
 *
 * @public
 */
export class ModsAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Lists all Mods available to the Server
     *
     * @public
     */
    async List() {
        const response = await this.core.makeRequest("GET", "mods");
        const data = await response.json();
        return data;
    }
    /**
     * Installs or Uninstalls the Mod with the given id
     *
     * @param id The ID of the Mod to Install/Uninstall
     *
     * @public
     */
    async ToggleInstall(id) {
        await this.core.makeRequest("POST", `mods/${id}`);
    }
}
