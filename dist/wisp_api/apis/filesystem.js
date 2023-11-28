/**
 * Handles interaction with the Server's File System
 *
 * @public
 */
export class FilesystemAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Get the Contents of the given Directory
     *
     * @param path The path to list
     *
     * @throws {@link GetDirectoryContentsErrorCode}
     *
     * @public
     */
    async GetDirectoryContents(path) {
        const response = await this.core.makeRequest("GET", "files/directory", { path: path });
        const data = await response.json();
        // TODO: Also include the data.code (or handle the 404 case specifically)
        if ("errors" in data && data.errors) {
            throw new Error(data.errors[0].code);
        }
        return data;
    }
    /**
     * Creates a Directory with the given path
     *
     * @remarks
     * ⚠️  This will silently fail if the given path is present and invalid or unreachable
     * ⚠️  This is always relative to the Server's default directory (usually /home/container)
     *
     * @param path The full path to the new Directory
     *
     * @public
     */
    async CreateDirectory(path) {
        await this.core.makeRequest("POST", "files/directory", { path: path });
    }
    /**
     * Retrieves the contents of the File at the given path
     *
     * @param path The full path to the File to read
     *
     * @throws "Server returned error code: {number}"
     * This error is often thrown if the given path doesn't exist, or is not readable. The error code would be 404.
     *
     * @public
     */
    async ReadFile(path) {
        const response = await this.core.makeRequest("GET", "files/read", { path: path });
        const data = await response.json();
        if (data.errors) {
            throw new Error(`Server returned error code: ${data.errors[0].data.code}`);
        }
        return data.content;
    }
    /**
     * Writes the given content to the File at the given path
     *
     * @remarks
     * ⚠️  Overwrites the file if it already exists
     * ⚠️  This function silently fails if the target path is not writeable
     *
     * @param path The full path to the File
     * @param content The full content of the File
     *
     * @public
     */
    async WriteFile(path, content) {
        const data = { path: path, content: content };
        await this.core.makeRequest("POST", "files/write", data);
    }
    /**
     * Copies the File at the given path
     *
     * @remarks
     * ⚠️  New copy will be written to the same directory, with a name such as `test.txt` -> `test.txt copy-1643810941850`
     *
     * @param path The full path to the File to Copy
     *
     * @throws "Unexpected response code, Copy may not have succeeded"
     * If the API returns anything other than a 204, something likely went wrong. Most commonly, this is because the file path didn't exist or wasn't copyable.
     *
     * @public
     */
    async CopyFile(path) {
        const requestData = { path: path };
        const response = await this.core.makeRequest("POST", "files/copy", requestData);
        if (response.status != 204) {
            throw new Error("Unexpected response code, Copy may not have succeeded");
        }
    }
    /**
     * Deletes the Files at all of the given paths
     *
     * @param paths An array of File Paths to Delete
     *
     * @throws "Unexpected response code, Delete may not have succeeded"
     * If the API returns anything other than a 204, something likely went wrong. Most commonly, this is because the file path didn't exist or wasn't deleteable.
     *
     * @public
     */
    async DeleteFiles(paths) {
        const response = await this.core.makeRequest("POST", "files/delete", { paths: paths });
        if (response.status != 204) {
            throw new Error("Unexpected response code, Delete may not have succeeded");
        }
    }
    /**
     * Retrieves a Download URL for a File
     *
     * @remarks
     * ⚠️  This will return a Download URL even if the given file does not exist
     *
     * @param path The full path to the File
     *
     * @public
     */
    async GetFileDownloadURL(path) {
        const response = await this.core.makeRequest("GET", "files/download", { path: path });
        const data = await response.json();
        return data.url;
    }
    /**
     * Renames (or moves) the given File
     *
     * @param path The full path to the File
     * @param to The new path of the File
     *
     * @throws "Unexpected response code, Rename may not have succeeded"
     * If the API returns anything other than a 204, something likely went wrong. Most commonly, this is because the source or destination path did not exist or was not reachable
     *
     * @public
     */
    async RenameFile(path, to) {
        const requestData = { path: path, to: to };
        const response = await this.core.makeRequest("PATCH", "files/rename", requestData);
        if (response.status != 204) {
            throw new Error("Unexpected response code, Rename may not have succeeded");
        }
    }
    /**
     * Compresses the Files at the given paths
     *
     * @remarks
     * ⚠️  The resulting file appears to be unpredictably named?
     *
     * @param paths An array of Paths to Compress
     * @param to The Directory to write the Compressed Files to
     *
     * @throws "Unexpected response code, Compress may not have succeeded"
     * If the API returns anything other than a 204, something likely went wrong. Most commonly, this is because the source or destination path did not exist or was not Compressable
     *
     * @public
     */
    async CompressFiles(paths, to) {
        const requestData = { paths: paths, to: to };
        const response = await this.core.makeRequest("POST", "files/compress", requestData);
        if (response.status != 204) {
            throw new Error("Unexpected response code, Compress may not have succeeded");
        }
    }
    /**
     * Decompresses the File at the given path
     *
     * @param path The full path to the File to Decompress
     *
     * @throws "Unexpected response code, Decompress may not have succeeded"
     * If the API returns anything other than a 204, something likely went wrong. Most commonly, this is because the given path did not exist or was not reachable
     *
     * @public
     */
    async DecompressFile(path) {
        const response = await this.core.makeRequest("POST", "files/decompress", { path: path });
        if (response.status != 204) {
            throw new Error("Unexpected response code, Decompress may not have succeeded");
        }
    }
}
