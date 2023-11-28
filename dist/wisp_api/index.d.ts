import { AllocationsAPI } from "./apis/allocations.js";
import { AuditLogsAPI } from "./apis/audit_log.js";
import { BackupsAPI } from "./apis/backups.js";
import { DatabasesAPI } from "./apis/databases.js";
import { FastDLAPI } from "./apis/fastdl.js";
import { FilesystemAPI } from "./apis/filesystem.js";
import { ModsAPI } from "./apis/mods.js";
import { SchedulesAPI } from "./apis/schedules.js";
import { ServersAPI } from "./apis/servers.js";
import { StartupAPI } from "./apis/startup.js";
import { SubusersAPI } from "./apis/subusers.js";
/**
 * An Interface for the Wisp HTTP API
 *
 * @public
 */
export declare class WispAPI {
    private core;
    Allocations: AllocationsAPI;
    AuditLogs: AuditLogsAPI;
    Backups: BackupsAPI;
    Databases: DatabasesAPI;
    FastDL: FastDLAPI;
    Filesystem: FilesystemAPI;
    Mods: ModsAPI;
    Schedules: SchedulesAPI;
    Servers: ServersAPI;
    Startup: StartupAPI;
    Subusers: SubusersAPI;
    /**
     * @param domain The domain name for your panel
     * @param uuid The UUID of the Server that all future API calls will reference
     * @param token The panel API token to use for authorization
     * @param logger The logger to use for all API logging
     *
     * @internal
     */
    constructor(domain: string, uuid: string, token: string, logger: any);
}
