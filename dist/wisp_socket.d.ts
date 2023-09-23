import { Socket } from "socket.io-client";
export type ConsoleMessage = {
    type: string;
    line: string;
};
export type GitCloneData = {
    dir: string;
    url: string;
    branch: string;
    authkey?: string | undefined;
};
export type GitCloneResult = {
    isPrivate: boolean;
};
export type GitPullData = {
    dir: string;
    authkey?: string;
};
export type GitPullResult = {
    output: string;
    isPrivate: boolean;
};
export type FilesearchFile = {
    results: number;
    lines: {
        [key: string]: string;
    };
};
export type FilesearchResults = {
    files: {
        [key: string]: FilesearchFile;
    };
    tooMany: boolean;
};
export type ServerToClientEvents = {
    "error": (message: string) => void;
    "auth_success": (message: string) => void;
    "filesearch-results": (data: FilesearchResults) => void;
    "git-error": (data: string) => void;
    "git-success": (message?: string) => void;
    "git-clone": (data: GitCloneData) => void;
    "git-pull": (data: GitPullData) => void;
    "console": (message: ConsoleMessage) => void;
};
export type ClientToServerEvents = {
    "auth": (token: string) => void;
    "filesearch-start": (query: string) => void;
    "git-clone": (data: GitCloneData) => void;
    "git-pull": (data: GitPullData) => void;
    "send command": (command: string) => void;
};
export type WebsocketInfo = {
    token: string;
    url: string;
};
export interface WispSocket {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    logger: any;
    api: any;
    url: string;
    token: string;
    ghToken: string;
}
export declare class WispSocket {
    constructor(logger: any, api: any, ghToken: string);
    setDetails(): Promise<void>;
    _connect(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    filesearch(query: string): Promise<FilesearchResults>;
    gitPull(dir: string): Promise<GitPullResult>;
    gitClone(url: string, dir: string, branch: string): Promise<GitCloneResult>;
    addConsoleListener(callback: (message: string) => void): void;
    sendCommandNonce(nonce: string, command: string, timeout?: number): Promise<string>;
}
