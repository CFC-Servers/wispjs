export class WispAPI {
    constructor(domain, uuid, token, logger) {
        this.domain = domain;
        this.uuid = uuid;
        this.token = token;
        this.logger = logger;
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
            if (method == "GET") {
                if (data !== null) {
                    const params = new URLSearchParams(data);
                    const uri = new URL(url);
                    uri.search = params.toString();
                    url = uri.toString();
                }
                response = await fetch(url, { method: "GET", headers: headers });
            }
            else if (method == "POST") {
                data = JSON.stringify(data);
                response = await fetch(url, { method: "POST", headers: headers, body: data });
            }
            else if (method == "DELETE") {
                response = await fetch(url, { method: "DELETE", headers: headers });
            }
            else if (method == "PUT") {
                data = JSON.stringify(data);
                response = await fetch(url, { method: "PUT", headers: headers, body: data });
            }
            else if (method == "PATCH") {
                data = JSON.stringify(data);
                response = await fetch(url, { method: "PATCH", headers: headers, body: data });
            }
            else {
                throw new Error(`Invalid method: ${method}`);
            }
            if (!response.ok) {
                const err = `Request failed! ${method} -> '${url}: ${response.status} - ${response.statusText}`;
                console.error(err);
                throw new Error(err);
            }
            return response;
        };
        return await request();
    }
    // Meta
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
    async updateStartup(startup) {
        try {
            const response = await this.makeRequest("PUT", "startup", startup);
            return response.ok;
        }
        catch (error) {
            this.logger.error(`Failed to update startup: ${error}`);
            return false;
        }
    }
    async getWebsocketDetails() {
        const response = await this.makeRequest("GET", "websocket");
        return await response.json();
    }
    async getServerDetails() {
        return await this.makeRequest("GET", "");
    }
    async getResources() {
        return await this.makeRequest("GET", "resources");
    }
    async powerRequest(action) {
        return await this.makeRequest("POST", "power", { signal: action });
    }
    // Filesystem
    // TODO: Handle pagination
    async getDirectoryContents(path) {
        const response = await this.makeRequest("GET", "files/directory", { path: path });
        return await response.json();
    }
    async createDirectory(path) {
        return await this.makeRequest("POST", "files/directory", { path: path });
    }
    async readFile(path) {
        const response = await this.makeRequest("GET", "files/read", { path: path });
        const responseData = await response.json();
        return responseData.content;
    }
    async writeFile(path, content) {
        const data = { path: path, content: content };
        return await this.makeRequest("POST", "files/write", data);
    }
    async deleteFiles(paths) {
        return await this.makeRequest("POST", "files/delete", { paths: paths });
    }
    async renameFile(path, newPath) {
        const data = { path: path, to: newPath };
        return await this.makeRequest("PATCH", "files/rename", data);
    }
    // FastDL
    async syncFastDL() {
        await this.makeRequest("POST", "fastdl");
    }
}
