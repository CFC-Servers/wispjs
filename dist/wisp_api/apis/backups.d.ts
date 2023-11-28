import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
import type { DownloadFileResponse } from "./filesystem";
export type Backup = {
    object: "backup";
    attributes: {
        uuid: string;
        uuid_short: string;
        name: string;
        sha256_hash: string;
        bytes: number;
        locked: boolean;
        creating: boolean;
        created_at: string;
    };
};
export type GetBackupsResponse = {
    object: "list";
    data: Backup[];
    meta: {
        pagination: PaginationData;
    };
};
export declare class BackupsAPI {
    private core;
    constructor(core: WispAPICore);
    List(): Promise<GetBackupsResponse>;
    Create(name: string): Promise<Response>;
    Lock(id: string): Promise<Response>;
    Deploy(id: string): Promise<Response>;
    Download(id: string): Promise<DownloadFileResponse>;
    Delete(id: string): Promise<Response>;
}
