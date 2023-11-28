import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
/**
 * A Backup Object
 * @example
 * ```json
 * {
 *     "object": "backup",
 *     "attributes": {
 *         "uuid": "26adeafc-74af-43fd-93a5-9afa0486b21b",
 *         "uuid_short": "26adeafc",
 *         "name": "test-1",
 *         "sha256_hash": "56d2965e9167c785647878a391dfe24460c3aa5e1111b385708094bd8837b487",
 *         "bytes": 3266448936,
 *         "locked": false,
 *         "creating": false,
 *         "created_at": "2023-11-28T08:37:39.000000Z"
 *     }
 * }
 * ```
 *
 * @internal
 */
export type Backup = {
    /**
     * The Backup attributes
     *
     *
     * @param uuid The UUID
     * @param uuid_short The short-form UUID
     * @param name The name
     * @param sha256_hash The hash of the backup. May not be present if it's still being created
     * @param bytes The size of the Backup, in bytes
     * @param locked Whether or not the Backup is locked
     * @param creating Whether or not the Backup is still being created
     * @param created_at A Timestamp indicating when the backup was created
     *
     * @internal
     */
    attributes: {
        uuid: string;
        uuid_short: string;
        name: string;
        sha256_hash: string | null;
        bytes: number;
        locked: boolean;
        creating: boolean;
        created_at: string;
    };
};
/**
 * Response object used in the GetBackups call
 *
 * @remarks
 * Used in {@link BackupsAPI.List}
 *
 * @internal
 */
export type GetBackupsResponse = {
    object: "list";
    data: Backup[];
    meta: {
        pagination: PaginationData;
    };
};
export type BackupErrorCode = "server.backups.creation_would_exceed_limit";
export type BackupError = {
    code: BackupErrorCode;
    data: any;
};
export type CreateBackupFailure = {
    errors: BackupError[] | undefined;
};
export type CreateBackupResponse = Backup | CreateBackupFailure;
/**
 * Handles basic server backup tasks, such as creating, restoring, and deleting backups
 */
export declare class BackupsAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Lists all current backups for the server
     *
     * @public
     */
    List(): Promise<GetBackupsResponse>;
    /**
     * Creates a new backup for the server
     *
     * @remarks
     * ⚠️  This can fail to create a Backup even if the function completes successfully
     * For example, if the backup would exceed the size limit (and the limit is not 0), the system wouldn't know it failed until it hit the limit.
     *
     * ⚠️  "It is recomended to stop your server before starting a backup. Backups created while the server is on can contain corupted data."
     *
     * Multiple Backups can exist with the same name.
     *
     * @param name The name of the Backup
     *
     * @throws {@link BackupErrorCode}
     * If the server returns an error code, it will be thrown verbatim here
     *
     * @public
     */
    Create(name: string): Promise<CreateBackupResponse>;
    /**
     * Toggles the "Locked" status of the Backup
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    ToggleLock(id: string): Promise<Backup>;
    /**
     * Deploys the Backup to the Server
     *
     * @remarks
     * **⚠️  This can be dangerous!**
     * The Backup will overwrite the entire Server, erasing any new data since the Backup's creation
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    Deploy(id: string): Promise<Response>;
    /**
     * Retrieves a URL from which the Backup can be downloaded
     *
     * @param id The ID of the Backup
     * @returns The download URL
     *
     * @public
     */
    GetDownloadURL(id: string): Promise<string>;
    /**
     * Deletes the Backup
     *
     * @param id The ID of the Backup
     *
     * @public
     */
    Delete(id: string): Promise<void>;
}
