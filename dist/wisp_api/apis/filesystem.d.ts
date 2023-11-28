import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
export type DirectoryFile = {
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
};
export type DirectoryContentsResponse = {
    object: "list";
    data: DirectoryFile[];
    meta: {
        pagination: PaginationData | undefined;
    };
};
export type FileReadResponse = {
    content: string;
};
export type FileWriteRequest = {
    path: string;
    content: string;
};
export type CopyFileRequest = {
    path: string;
};
export type DownloadFileResponse = {
    url: string;
};
export type RenameFileRequest = {
    path: string;
    to: string;
};
export type CompressFilesRequest = {
    paths: string[];
    to: string;
};
export declare class FilesystemAPI {
    private core;
    constructor(core: WispAPICore);
    GetDirectoryContents(path: string): Promise<DirectoryContentsResponse>;
    CreateDirectory(path: string): Promise<Response>;
    ReadFile(path: string): Promise<FileReadResponse>;
    WriteFile(path: string, content: string): Promise<Response>;
    CopyFile(path: string): Promise<Response>;
    DeleteFiles(paths: string[]): Promise<Response>;
    DownloadFile(path: string): Promise<DownloadFileResponse>;
    RenameFile(path: string, to: string): Promise<Response>;
    CompressFiles(paths: string[], to: string): Promise<Response>;
    DecompressFile(path: string): Promise<Response>;
}
