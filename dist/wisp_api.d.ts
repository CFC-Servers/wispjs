import { AllocationsAPI } from "./wisp_api/allocations";
import { AuditLogsAPI } from "./wisp_api/audit_log";
import { BackupsAPI } from "./wisp_api/backups";
import { DatabasesAPI } from "./wisp_api/databases";
import { FastDLAPI } from "./wisp_api/fastdl";
import { FilesystemAPI } from "./wisp_api/filesystem";
import { ModsAPI } from "./wisp_api/mods";
import { SchedulesAPI } from "./wisp_api/schedules";
import { ServersAPI } from "./wisp_api/servers";
import { StartupAPI } from "./wisp_api/startup";
import { SubusersAPI } from "./wisp_api/subusers";
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
    constructor(domain: string, uuid: string, token: string, logger: any);
}
