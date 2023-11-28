export class FilesystemAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/files/directory
    // TODO: Handle pagination
    async GetDirectoryContents(path) {
        const response = await this.core.makeRequest("GET", "files/directory", { path: path });
        return await response.json();
    }
    // [POST] /api/client/servers/<UUID>/files/directory
    async CreateDirectory(path) {
        return await this.core.makeRequest("POST", "files/directory", { path: path });
    }
    // [GET] /api/client/servers/<UUID>/files/read
    async ReadFile(path) {
        const response = await this.core.makeRequest("GET", "files/read", { path: path });
        const responseData = await response.json();
        return responseData.content;
    }
    // [POST] /api/client/servers/<UUID>/files/write
    // "Overwrites the file if it already exists."
    async WriteFile(path, content) {
        const data = { path: path, content: content };
        return await this.core.makeRequest("POST", "files/write", data);
    }
    // [POST] /api/client/servers/<UUID>/files/copy
    // "New copy will be written to the same directory, with a name such as `test.txt` -> `test.txt copy-1643810941850`"
    async CopyFile(path) {
        const data = { path: path };
        return await this.core.makeRequest("POST", "files/copy", data);
    }
    // (Wrapper) [DELETE] /api/client/servers/<UUID>/files/delete
    async DeleteFiles(paths) {
        return await this.core.makeRequest("POST", "files/delete", { paths: paths });
    }
    // [GET] /api/client/servers/<UUID>/files/download
    // "Retrieves a download URL to a file"
    async DownloadFile(path) {
        const response = await this.core.makeRequest("GET", "files/download", { path: path });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/files/rename
    async RenameFile(path, to) {
        const data = { path: path, to: to };
        return await this.core.makeRequest("PUT", "files/rename", data);
    }
    // [POST] /api/client/servers/<UUID>/files/compress
    async CompressFiles(paths, to) {
        const data = { paths: paths, to: to };
        return await this.core.makeRequest("POST", "files/compress", data);
    }
    // [POST] /api/client/servers/<UUID>/files/decompress
    async DecompressFile(path) {
        return await this.core.makeRequest("POST", "files/decompress", { path: path });
    }
}
