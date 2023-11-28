import { WispAPICore } from "./apis/index.js";
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
export class WispAPI {
    constructor(domain, uuid, token, logger) {
        this.core = new WispAPICore(domain, uuid, token, logger);
        this.Allocations = new AllocationsAPI(this.core);
        this.AuditLogs = new AuditLogsAPI(this.core);
        this.Backups = new BackupsAPI(this.core);
        this.Databases = new DatabasesAPI(this.core);
        this.FastDL = new FastDLAPI(this.core);
        this.Filesystem = new FilesystemAPI(this.core);
        this.Mods = new ModsAPI(this.core);
        this.Schedules = new SchedulesAPI(this.core);
        this.Servers = new ServersAPI(this.core);
        this.Startup = new StartupAPI(this.core);
        this.Subusers = new SubusersAPI(this.core);
    }
}
