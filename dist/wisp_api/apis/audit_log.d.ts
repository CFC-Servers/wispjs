import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
/**
 * Device information
 *
 * @example
 * ```json
 * {
 *    "city_name": "Seattle",
 *    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
 *    "country_name": "US",
 *    "country_iso_code": "US"
 * }
 * ```
 *
 * @internal
 */
export interface Device {
    city_name: string;
    user_agent: string;
    country_name: string;
    country_iso_code: string;
}
/**
 * An Audit Log struct
 *
 * @internal
 */
export interface AuditLog {
    object: "audit_log";
    attributes: {
        action: string;
        subaction: string;
        device: Device | undefined;
        metadata: any;
        created_at: string;
    };
}
/**
 * The respones object from the GetAuditLogs call
 *
 * @remarks
 * Used in {@link AuditLogsAPI.List}
 *
 * @public
 */
export interface GetAuditLogsResponse {
    object: "list";
    data: AuditLog[];
    meta: {
        pagination: PaginationData;
    };
}
/**
 * Interface that handles Listing of all Audit Logs
 *
 * @public
 */
export declare class AuditLogsAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * List all Audit Log events for the server
     *
     * @public
     */
    List(): Promise<GetAuditLogsResponse>;
}
