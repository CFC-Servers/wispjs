export class WispAPICore {
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
}