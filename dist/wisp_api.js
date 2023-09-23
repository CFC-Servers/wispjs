export class WispAPI {
    constructor(domain, uuid, token, logger) {
        this.domain = domain;
        this.uuid = uuid;
        this.token = token;
        this.logger = logger;
    }
    setUUID(uuid) {
        this.uuid = uuid;
    }
    makeURL(path) {
        return `https://${this.domain}/api/client/servers/${this.uuid}/${path}`;
    }
    async makeRequest(method, path, data) {
        let url = this.makeURL(path);
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/vnd.wisp.v1+json",
            "Authorization": `Bearer ${this.token}`,
            "User-Agent": "WispJS (https://github.com/CFC-Servers/wispjs, 1.0.0)"
        });
        const request = async () => {
            let response;
            console.log(`${method} -> ${url}`);
            switch (method) {
                case "GET":
                    if (data !== null) {
                        const params = new URLSearchParams(data);
                        const uri = new URL(url);
                        uri.search = params.toString();
                        url = uri.toString();
                        console.log(`Updated GET URL: ${url}`);
                    }
                    response = await fetch(url, { method: "GET", headers: headers });
                    break;
                case "POST":
                    data = JSON.stringify(data);
                    response = await fetch(url, { method: "POST", headers: headers, body: data });
                    break;
                case "PUT":
                    data = data ? JSON.stringify(data) : "";
                    response = await fetch(url, { method: "PUT", headers: headers, body: data });
                    break;
                case "PATCH":
                    data = JSON.stringify(data);
                    response = await fetch(url, { method: "PATCH", headers: headers, body: data });
                    break;
                case "DELETE":
                    response = await fetch(url, { method: "DELETE", headers: headers });
                    break;
                default:
                    throw new Error(`Invalid method: ${method}`);
            }
            if (!response.ok) {
                const status = response.status;
                const statusText = response.statusText;
                this.logger.error(`Request failed: ${method} -> ${url}: ${status} - ${statusText}`);
                const text = await response.text();
                this.logger.error(text);
                throw new Error(`Request failed! Status: ${status} - ${statusText}`);
            }
            return response;
        };
        return await request();
    }
    // -------------
    //  Servers API
    // -------------
    // [POST] /api/client/servers/<UUID>/command
    async sendCommand(command) {
        try {
            const response = await this.makeRequest("POST", "command", { command: command });
            return response.ok;
        }
        catch (error) {
            this.logger.error(`Failed to send command: ${error}`);
            return false;
        }
    }
    // [GET] api/client/servers/<UUID>/details
    async getWebsocketDetails() {
        const response = await this.makeRequest("GET", "websocket");
        console.log("Got websocket details response", response);
        return await response.json();
    }
    // [PATCH] /api/client/servers/<UUID>/details
    async setServerName(name) {
        return await this.makeRequest("PATCH", "details", { name: name });
    }
    // [GET] /api/client/servers/<UUID>
    async getServerDetails() {
        return await this.makeRequest("GET", "");
    }
    // [GET] /api/client/servers/<UUID>/resources
    async getResources() {
        return await this.makeRequest("GET", "resources");
    }
    // [POST] /api/client/servers/<UUID>/power
    async powerRequest(action) {
        return await this.makeRequest("POST", "power", { signal: action });
    }
    // -------------
    //  Startup API
    // -------------
    // [GET] /api/client/servers/<UUID>/startup
    async getStartup() {
        const response = await this.makeRequest("GET", "startup");
        const startupDetails = await response.json();
        return startupDetails;
    }
    // [PUT] /api/client/servers/<UUID>/startup
    // "Pass the variables with their new value to update them. Response will contain the new updated startup."
    async updateStartup(startup) {
        return await this.makeRequest("PUT", "startup", startup);
    }
    // ----------------
    //  Filesystem API
    // ----------------
    // [GET] /api/client/servers/<UUID>/files/directory
    // TODO: Handle pagination
    async getDirectoryContents(path) {
        const response = await this.makeRequest("GET", "files/directory", { path: path });
        return await response.json();
    }
    // [POST] /api/client/servers/<UUID>/files/directory
    async createDirectory(path) {
        return await this.makeRequest("POST", "files/directory", { path: path });
    }
    // [GET] /api/client/servers/<UUID>/files/read
    async readFile(path) {
        const response = await this.makeRequest("GET", "files/read", { path: path });
        const responseData = await response.json();
        return responseData.content;
    }
    // [POST] /api/client/servers/<UUID>/files/write
    // "Overwrites the file if it already exists."
    async writeFile(path, content) {
        const data = { path: path, content: content };
        return await this.makeRequest("POST", "files/write", data);
    }
    // [POST] /api/client/servers/<UUID>/files/copy
    // "New copy will be written to the same directory, with a name such as `test.txt` -> `test.txt copy-1643810941850`"
    async copyFile(path) {
        const data = { path: path };
        return await this.makeRequest("POST", "files/copy", data);
    }
    // (Wrapper) [DELETE] /api/client/servers/<UUID>/files/delete
    async deleteFiles(paths) {
        return await this.makeRequest("POST", "files/delete", { paths: paths });
    }
    // [GET] /api/client/servers/<UUID>/files/download
    // "Retrieves a download URL to a file"
    async downloadFile(path) {
        const response = await this.makeRequest("GET", "files/download", { path: path });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/files/rename
    async renameFile(path, to) {
        const data = { path: path, to: to };
        return await this.makeRequest("PUT", "files/rename", data);
    }
    // [POST] /api/client/servers/<UUID>/files/compress
    async compressFiles(paths, to) {
        const data = { paths: paths, to: to };
        return await this.makeRequest("POST", "files/compress", data);
    }
    // [POST] /api/client/servers/<UUID>/files/decompress
    async decompressFile(path) {
        return await this.makeRequest("POST", "files/decompress", { path: path });
    }
    // -------------
    //  FastDL API
    // -------------
    // [POST] /api/client/servers/<UUID>/fastdl
    async syncFastDL() {
        return await this.makeRequest("POST", "fastdl");
    }
    // -----------------
    //  Allocations API
    // -----------------
    // [GET] /api/client/servers/<UUID>/allocations
    async getAllocations() {
        const response = await this.makeRequest("GET", "allocations");
        const data = await response.json();
        return data;
    }
    // [PUT] /api/client/servers/<UUID>/allocations/<ID>
    async updateAllocation(id) {
        return await this.makeRequest("PUT", `allocations/${id}`);
    }
    // -----------------
    //  Audit Log API
    // -----------------
    // [GET] /api/client/servers/<UUID>/audit-logs
    async getAuditLogs() {
        const response = await this.makeRequest("GET", "audit-logs");
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/backups
    async getBackups() {
        const response = await this.makeRequest("GET", "backups");
        const data = await response.json();
        return data;
    }
    // TODO: Does this have a response?
    // [POST] /api/client/servers/<UUID>/backups
    async createBackup(name) {
        return await this.makeRequest("POST", "backups", { name: name });
    }
    // [POST] /api/client/servers/<UUID>/backups/<ID>/locked
    async lockBackup(id) {
        return await this.makeRequest("POST", `backups/${id}/locked`);
    }
    // TODO: Erm should we even offer this
    // [POST] /api/client/servers/<UUID>/backups/<ID>/deploy
    async deployBackup(id) {
        return await this.makeRequest("POST", `backups/${id}/deploy`);
    }
    // [GET] /api/client/servers/<UUID>/backups/ID>/download
    async downloadBackup(id) {
        const response = await this.makeRequest("GET", `backups/${id}/download`);
        const data = await response.json();
        return data;
    }
    // [DELETE] /api/client/servers/<UUID>/backups/<ID>
    async deleteBackup(id) {
        return await this.makeRequest("DELETE", `backups/${id}`);
    }
    // -----------------
    //  Database API
    // -----------------
    // [GET] /api/client/servers/<UUID>/databases
    async getDatabases() {
        const response = await this.makeRequest("GET", "databases", { include: "hosts" });
        const data = await response.json();
        return data;
    }
    // TODO: verify response
    // [DELETE] /api/client/servers/<UUID>/databases/<ID>
    async deleteDatabase(id) {
        return await this.makeRequest("DELETE", `databases/${id}`);
    }
    // TODO: Verify response
    // [POST] /api/client/servers/<UUID>/databases/<ID>/rotate-password
    async rotateDatabasePassword(id) {
        return await this.makeRequest("POST", `databases/${id}`);
    }
    // ----------
    //  Mods API
    // ----------
    // [GET] /api/client/servers/<UUID>/mods
    async getMods(search = null) {
        const searchStruct = search ? { search: search } : null;
        const response = await this.makeRequest("GET", "mods", searchStruct);
        const data = await response.json();
        return data;
    }
    // [POST] /api/client/servers/<UUID>/mods/<ID>
    async installMod(id) {
        return await this.makeRequest("POST", `mods/${id}`);
    }
    // ---------------
    //  Schedules API
    // ---------------
    // [GET] /api/client/servers/<UUID>/schedules
    async getSchedules() {
        const response = await this.makeRequest("GET", "schedules", { include: "tasks" });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/schedules/<ID>
    async getScheduleDetails(id) {
        const response = await this.makeRequest("GET", `schedules/${id}`, { include: "tasks" });
        const data = await response.json();
        return data;
    }
    // [POST] /api/client/servers/<UUID>/schedules
    async createSchedule(name, minute, hour, dow, dom, active) {
        const data = {
            name: name,
            cron_minute: minute,
            cron_hour: hour,
            cron_day_of_week: dow,
            cron_day_of_month: dom,
            is_active: active
        };
        const response = await this.makeRequest("POST", "schedules", data);
        const responseData = await response.json();
        return responseData;
    }
    // [PATCH] /api/client/servers/<UUID>/schedules/<ID>
    async updateSchedule(id, name, minute, hour, dow, dom, active) {
        const data = {
            name: name,
            cron_minute: minute,
            cron_hour: hour,
            cron_day_of_week: dow,
            cron_day_of_month: dom,
            is_active: active
        };
        const response = await this.makeRequest("PATCH", `schedules/${id}`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [POST] /api/client/servers/<UUID>/schedules/<ID>/trigger
    async triggerSchedule(id) {
        return await this.makeRequest("POST", `schedules/${id}`);
    }
    // [DELETE] /api/client/servers/<UUID>/schedules/<ID>
    async deleteSchedule(id) {
        return await this.makeRequest("DELETE", `schedules/${id}`);
    }
    // [POST] /api/client/servers/<UUID>/schedules/<SCHEDULE_ID>/tasks
    // "Payload is not required for backup action!"
    async createScheduleTask(id, action, timeOffset, payload) {
        const data = {
            action: action,
            time_offset: timeOffset,
            payload: payload
        };
        const response = await this.makeRequest("POST", `schedules/${id}/tasks`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [PATCH] /api/client/servers/<UUID>/schedules/<SCHEDULE_ID>/task/<TASK_ID>
    // "Payload is not required for backup action!"
    async updateScheduleTask(scheduleID, taskID, action, timeOffset, payload) {
        const data = {
            action: action,
            time_offset: timeOffset,
            payload: payload
        };
        const response = await this.makeRequest("PATCH", `schedules/${scheduleID}/tasks/${taskID}`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [DELETE] /api/client/servers/<UUID>/schedules/<SCHEDULE_ID>/task/<TASK_ID>
    async deleteScheduleTask(scheduleID, taskID) {
        return await this.makeRequest("DELETE", `schedules/${scheduleID}/tasks/${taskID}`);
    }
    // ---------------
    //  Subusers API
    // ---------------
    // [GET] /api/client/servers/<UUID>/subusers
    async getSubusers() {
        const response = await this.makeRequest("GET", "subusers", { include: "user" });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/subusers/<SUB_ID>
    async getSubuserDetails(id) {
        const response = await this.makeRequest("GET", `subusers/${id}`, { include: "user" });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/subusers/permissions
    async getAllSubuserPermissions() {
        const response = await this.makeRequest("GET", "subusers/permissions");
        const data = await response.json();
        return data;
    }
    // [POST] /api/client/servers/<UUID>/subusers
    async createSubuser(email, permissions) {
        const data = {
            email: email,
            permissions: permissions
        };
        const response = await this.makeRequest("POST", "subusers", data);
        const responseData = await response.json();
        return responseData;
    }
    // [PATCH] /api/client/servers/<UUID>/subusers/<SUB_ID>
    async updateSubuser(id, email, permissions) {
        const data = {
            email: email,
            permissions: permissions
        };
        const response = await this.makeRequest("PATCH", `subusers/${id}`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [DELETE] /api/client/servers/<UUID>/subusers/<SUB_ID>
    async deleteSubuser(id) {
        return await this.makeRequest("DELETE", `subusers/${id}`);
    }
}
