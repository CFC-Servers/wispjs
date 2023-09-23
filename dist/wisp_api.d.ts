export type RequestTypes = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export interface WispAPI {
    domain: string;
    uuid: string;
    token: string;
    logger: any;
}
export type UpdateStartup = {
    environment: {
        [key: string]: any;
    };
};
export type StartupDetail = {
    object: "server_variable";
    attributes: {
        name: string;
        description: string;
        env_variable: string;
        default_value: string;
        tickable: boolean;
        user_editable: boolean;
        rules: string;
        server_value: string;
    };
};
export type StartupDetails = {
    object: "list";
    data: StartupDetail[];
    meta: {
        startup_command: string;
    };
};
export type PaginationData = {
    total: number;
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
};
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
export type Allocation = {
    object: "allocation";
    attributes: {
        primary: boolean;
        ip: string;
        alias: string;
        port: number;
    };
};
export type GetAllocationsResponse = {
    object: "list";
    data: Allocation[];
    meta: {
        pagination: PaginationData;
    };
};
export type Device = {
    city_name: string;
    user_agent: string;
    country_name: string;
    country_iso_code: string;
};
export type AuditLog = {
    object: "audit_log";
    attributes: {
        action: string;
        subaction: string;
        device: Device | null;
        metadata: any;
        created_at: string;
    };
};
export type GetAuditLogsResponse = {
    object: "list";
    data: AuditLog[];
    meta: {
        pagination: PaginationData;
    };
};
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
export type Mod = {
    object: "mod";
    attributes: {
        id: number;
        name: string;
        description: string;
        version: string;
        category: string;
        install_count: number;
        server_state: number;
    };
};
export type GetModsResponse = {
    object: "list";
    data: Mod[];
};
export type CronSchedule = {
    minute: string;
    hour: string;
    day_of_week: string;
    day_of_month: string;
};
export type Schedule = {
    object: "schedule";
    attributes: {
        id: number;
        name: string;
        cron: CronSchedule;
        is_active: boolean;
        is_processing: boolean;
        last_run_at: string | null;
        next_run_at: string | null;
        created_at: string;
        updated_at: string;
    };
};
export type GetSchedulesResponse = {
    object: "list";
    data: Schedule[];
    meta: {
        pagination: PaginationData;
    };
};
export type CreateScheduleRequest = {
    name: string;
    cron_minute: string;
    cron_hour: string;
    cron_day_of_week: string;
    cron_day_of_month: string;
    is_active: boolean;
};
export type ScheduleTask = {
    object: "schedule_task";
    attributes: {
        id: number;
        sequence_id: number;
        action: string;
        payload: string;
        time_offset: string;
        is_processing: boolean;
        created_at: string;
        updated_at: string;
    };
};
export type ScheduleTaskAction = "command" | "power" | "backup";
export type CreateScheduleTaskRequest = {
    action: ScheduleTaskAction;
    time_offset: number;
    payload: string | null;
};
export type SupportPermissionType = "server:support.update";
export type ControlPermissionType = "server:control.console" | "server:control.command" | "server:control.start" | "server:control.stop" | "server:control.restart";
export type SubuserPermissionType = "server:subuser.read" | "server:subuser.update" | "server:subuser.create" | "server:subuser.delete";
export type AllocationPermissionType = "server:allocation.read" | "server:allocation.update";
export type StartupPermissionType = "server:startup.read" | "server:startup.update";
export type DatabasePermissionType = "server:database.read" | "server:database.update" | "server:database.create" | "server:database.update";
export type FilePermissionType = "server:file.sftp" | "server:file.list" | "server:file.read" | "server:file.write" | "server:file.delete" | "server:file.archive" | "server:file.git" | "server:file.steam_workshop";
export type SchedulePermissionType = "server:schedule.read" | "server:schedule.update" | "server:schedule.create" | "server:schedule.delete";
export type BackupPermissionType = "server:backup.read" | "server:backup.update" | "server:backup.create" | "server:backup.delete" | "server:backup.deploy" | "server:backup.download";
export type DetailsPermissionType = "server:details.read" | "server:details.update";
export type AuditPermissionType = "server:audit.read";
export type FastDLPermissionType = "server:fastdl.read" | "server:fastdl.update";
export type ModPermissionType = "server:mod.read" | "server:mod.update";
export type MonitorPermissionType = "server:monitor.read" | "server:monitor.update";
export type ReinstallPermissionType = "server:reinstall.update";
export type Permission = SupportPermissionType | ControlPermissionType | SubuserPermissionType | AllocationPermissionType | StartupPermissionType | DatabasePermissionType | FilePermissionType | SchedulePermissionType | BackupPermissionType | DetailsPermissionType | AuditPermissionType | FastDLPermissionType | ModPermissionType | MonitorPermissionType | ReinstallPermissionType;
export type User = {
    object: "user";
    attributes: {
        email: string;
        name_first: string;
        naem_last: string;
        has_2fa: boolean;
    };
};
export type Subuser = {
    object: "server_subuser";
    attributes: {
        id: number;
        permissions: Permission[];
        created_at: string;
        updated_at: string;
        relationships: {
            user: User;
        };
    };
};
export type GetSubusersResponse = {
    object: "list";
    data: Subuser[];
    meta: {
        pagination: PaginationData;
    };
};
export type GetAllSubuserPermissionsResponse = {
    permissions: Permission[];
    assignable: Permission[];
};
export type PowerRequest = "start" | "stop" | "restart" | "kill";
export declare class WispAPI {
    constructor(domain: string, uuid: string, token: string, logger: any);
    setUUID(uuid: string): void;
    makeURL(path: string): string;
    makeRequest(method: RequestTypes, path: string, data?: any): Promise<Response>;
    sendCommand(command: string): Promise<boolean>;
    getWebsocketDetails(): Promise<any>;
    setServerName(name: string): Promise<Response>;
    getServerDetails(): Promise<Response>;
    getResources(): Promise<Response>;
    powerRequest(action: PowerRequest): Promise<Response>;
    getStartup(): Promise<StartupDetails>;
    updateStartup(startup: UpdateStartup): Promise<Response>;
    getDirectoryContents(path: string): Promise<DirectoryContentsResponse>;
    createDirectory(path: string): Promise<Response>;
    readFile(path: string): Promise<FileReadResponse>;
    writeFile(path: string, content: string): Promise<Response>;
    copyFile(path: string): Promise<Response>;
    deleteFiles(paths: string[]): Promise<Response>;
    downloadFile(path: string): Promise<DownloadFileResponse>;
    renameFile(path: string, to: string): Promise<Response>;
    compressFiles(paths: string[], to: string): Promise<Response>;
    decompressFile(path: string): Promise<Response>;
    syncFastDL(): Promise<Response>;
    getAllocations(): Promise<GetAllocationsResponse>;
    updateAllocation(id: string): Promise<Response>;
    getAuditLogs(): Promise<GetAuditLogsResponse>;
    getBackups(): Promise<GetBackupsResponse>;
    createBackup(name: string): Promise<Response>;
    lockBackup(id: string): Promise<Response>;
    deployBackup(id: string): Promise<Response>;
    downloadBackup(id: string): Promise<DownloadFileResponse>;
    deleteBackup(id: string): Promise<Response>;
    getDatabases(): Promise<GetDatabasesResponse>;
    deleteDatabase(id: string): Promise<Response>;
    rotateDatabasePassword(id: string): Promise<Response>;
    getMods(search?: string | null): Promise<GetModsResponse>;
    installMod(id: string): Promise<Response>;
    getSchedules(): Promise<GetSchedulesResponse>;
    getScheduleDetails(id: string): Promise<Schedule>;
    createSchedule(name: string, minute: string, hour: string, dow: string, dom: string, active: boolean): Promise<Schedule>;
    updateSchedule(id: string, name: string, minute: string, hour: string, dow: string, dom: string, active: boolean): Promise<Schedule>;
    triggerSchedule(id: string): Promise<Response>;
    deleteSchedule(id: string): Promise<Response>;
    createScheduleTask(id: string, action: ScheduleTaskAction, timeOffset: number, payload: string | null): Promise<ScheduleTask>;
    updateScheduleTask(scheduleID: string, taskID: string, action: ScheduleTaskAction, timeOffset: number, payload: string | null): Promise<ScheduleTask>;
    deleteScheduleTask(scheduleID: string, taskID: string): Promise<Response>;
    getSubusers(): Promise<GetSubusersResponse>;
    getSubuserDetails(id: string): Promise<Subuser>;
    getAllSubuserPermissions(): Promise<GetAllSubuserPermissionsResponse>;
    createSubuser(email: string, permissions: Permission[]): Promise<Subuser>;
    updateSubuser(id: string, email: string, permissions: Permission[]): Promise<Subuser>;
    deleteSubuser(id: string): Promise<Response>;
}
