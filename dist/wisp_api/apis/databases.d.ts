import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
export interface DatabaseRelationship {
    object: "database_host";
    attributes: {
        id: number;
        name: string;
        host: string;
        port: number;
        phpmyadmin_url: string | null;
    };
}
export interface Database {
    object: "database";
    attributes: {
        id: number;
        name: string;
        remote: string;
        username: string;
        password: string;
        relationships: DatabaseRelationship[];
    };
}
export interface GetDatabasesResponse {
    object: "list";
    data: Database[];
    meta: {
        pagination: PaginationData;
    };
}
/**
 * Handles Creating, Listing, Updating, and Deleting of Databases for the Server
 *
 * @public
 */
export declare class DatabasesAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Lists all Databases associated with the Server
     *
     * @public
     */
    List(): Promise<GetDatabasesResponse>;
    /**
     * Deletes the Database from the Server
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    Delete(id: string): Promise<Response>;
    /**
     * Rotates the password for the Backup
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    RotatePassword(id: string): Promise<Response>;
}
