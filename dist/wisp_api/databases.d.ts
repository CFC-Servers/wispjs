import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
export type DatabaseRelationship = {
    object: "database_host";
    attributes: {
        id: number;
        name: string;
        host: string;
        port: number;
        phpmyadmin_url: string | null;
    };
};
export type Database = {
    object: "database";
    attributes: {
        id: number;
        name: string;
        remote: string;
        username: string;
        password: string;
        relationships: DatabaseRelationship[];
    };
};
export type GetDatabasesResponse = {
    object: "list";
    data: Database[];
    meta: {
        pagination: PaginationData;
    };
};
export declare class DatabasesAPI {
    private core;
    constructor(core: WispAPICore);
    List(): Promise<GetDatabasesResponse>;
    Delete(id: string): Promise<Response>;
    RotatePassword(id: string): Promise<Response>;
}
