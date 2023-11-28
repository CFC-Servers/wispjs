/**
 * Handles basic server backup tasks, such as creating, restoring, and deleting backups
 */
export class BackupsAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Lists all current backups for the server
     *
     * @public
     */
    async List() {
        const response = await this.core.makeRequest("GET", "backups");
        const data = await response.json();
        return data;
    }
    /**
     * Creates a new backup for the server
     *
     * @remarks
     * ⚠️  This can fail to create a Backup even if the function completes successfully
     * For example, if the backup would exceed the size limit (and the limit is not 0), the system wouldn't know it failed until it hit the limit.
     *
     * ⚠️  "It is recomended to stop your server before starting a backup. Backups created while the server is on can contain corupted data."
     *
     * Multiple Backups can exist with the same name.
     *
     * @param name The name of the Backup
     *
     * @throws {@link BackupErrorCode}
     * If the server returns an error code, it will be thrown verbatim here
     *
     * @public
     */
    async Create(name) {
        const response = await this.core.makeRequest("POST", "backups", { name: name });
        const data = await response.json();
        if ("errors" in data && data.errors) {
            throw new Error(data.errors[0].code);
        }
        return data;
    }
    /**
     * Toggles the "Locked" status of the Backup
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    async ToggleLock(id) {
        const response = await this.core.makeRequest("POST", `backups/${id}/locked`);
        const data = await response.json();
        return data;
    }
    /**
     * Deploys the Backup to the Server
     *
     * @remarks
     * **⚠️  This can be dangerous!**
     * The Backup will overwrite the entire Server, erasing any new data since the Backup's creation
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    async Deploy(id) {
        return await this.core.makeRequest("POST", `backups/${id}/deploy`);
    }
    /**
     * Retrieves a URL from which the Backup can be downloaded
     *
     * @param id The ID of the Backup
     * @returns The download URL
     *
     * @public
     */
    async GetDownloadURL(id) {
        const response = await this.core.makeRequest("GET", `backups/${id}/download`);
        const data = await response.json();
        return data.url;
    }
    /**
     * Deletes the Backup
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    async Delete(id) {
        await this.core.makeRequest("DELETE", `backups/${id}`);
    }
}
