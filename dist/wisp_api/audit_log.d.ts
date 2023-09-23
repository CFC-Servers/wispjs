import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
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
export declare class AuditLogsAPI {
    private core;
    constructor(core: WispAPICore);
    List(): Promise<GetAuditLogsResponse>;
}
