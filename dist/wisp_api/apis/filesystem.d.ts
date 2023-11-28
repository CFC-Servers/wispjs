import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
export interface DirectoryFile {
    object: "file";
    attributes: {
        type: "file" | "directory";
        name: string;
        size: number;
        mime: string;
        symlink: boolean;
        created_at: string;
        modified_at: string;
    };
}
export interface DirectoryContents {
    object: "list";
    data: DirectoryFile[];
    meta: {
        pagination: PaginationData | undefined;
    };
}
export type GetDirectoryContentsErrorCode = "generic.daemon_connection_exception";
export interface GetDirectoryContentsError {
    code: GetDirectoryContentsErrorCode;
    data: {
        code: number;
    };
}
export interface GetDirectoryContentsFailure {
    errors: GetDirectoryContentsError[] | undefined;
}
/**
 * The response object for the GetDirectoryContents call
 *
 * @remarks
 * Used in {@link FilesystemAPI.GetDirectoryContents}
 *
 * @public
 */
export type GetDirectoryContentsResponse = DirectoryContents | GetDirectoryContentsFailure;
export interface FileReadError {
    code: string;
    data: {
        code: number;
    };
}
export type FileReadResponse = {
    errors: FileReadError[];
    content?: never;
} | {
    content: string;
    errors?: never;
};
export interface FileWriteRequest {
    path: string;
    content: string;
}
export interface CopyFileRequest {
    path: string;
}
export interface DownloadFileResponse {
    url: string;
}
export interface RenameFileRequest {
    path: string;
    to: string;
}
export interface CompressFilesRequest {
    paths: string[];
    to: string;
}
/**
 * Handles interaction with the Server's File System
 *
 * @public
 */
export declare class FilesystemAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Get the Contents of the given Directory
     *
     * @param path The path to list
     *
     * @throws {@link GetDirectoryContentsErrorCode}
     *
     * @public
     */
    GetDirectoryContents(path: string): Promise<GetDirectoryContentsResponse>;
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
    CreateDirectory(path: string): Promise<void>;
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
    ReadFile(path: string): Promise<string>;
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
    WriteFile(path: string, content: string): Promise<void>;
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
    CopyFile(path: string): Promise<void>;
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
    DeleteFiles(paths: string[]): Promise<void>;
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
    GetFileDownloadURL(path: string): Promise<string>;
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
    RenameFile(path: string, to: string): Promise<void>;
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
    CompressFiles(paths: string[], to: string): Promise<void>;
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
    DecompressFile(path: string): Promise<void>;
}
