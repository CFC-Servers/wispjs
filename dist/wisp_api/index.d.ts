export type RequestTypes = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type PaginationData = {
    total: number;
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
};
export interface WispAPICore {
    domain: string;
    uuid: string;
    token: string;
    logger: any;
}
export declare class WispAPICore {
    constructor(domain: string, uuid: string, token: string, logger: any);
    setUUID(uuid: string): void;
    makeURL(path: string): string;
    makeRequest(method: RequestTypes, path: string, data?: any): Promise<Response>;
}
