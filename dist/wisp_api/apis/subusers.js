export class SubusersAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/subusers
    async List() {
        const response = await this.core.makeRequest("GET", "subusers", { include: "user" });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/subusers/<SUB_ID>
    async GetDetails(id) {
        const response = await this.core.makeRequest("GET", `subusers/${id}`, { include: "user" });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/subusers/permissions
    async GetAllPermissions() {
        const response = await this.core.makeRequest("GET", "subusers/permissions");
        const data = await response.json();
        return data;
    }
    // [POST] /api/client/servers/<UUID>/subusers
    async Create(email, permissions) {
        const data = {
            email: email,
            permissions: permissions
        };
        const response = await this.core.makeRequest("POST", "subusers", data);
        const responseData = await response.json();
        return responseData;
    }
    // [PATCH] /api/client/servers/<UUID>/subusers/<SUB_ID>
    async Update(id, email, permissions) {
        const data = {
            email: email,
            permissions: permissions
        };
        const response = await this.core.makeRequest("PATCH", `subusers/${id}`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [DELETE] /api/client/servers/<UUID>/subusers/<SUB_ID>
    async Delete(id) {
        return await this.core.makeRequest("DELETE", `subusers/${id}`);
    }
}
