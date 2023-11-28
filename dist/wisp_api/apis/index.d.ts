export type RequestTypes = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export interface PaginationData {
    total: number;
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
}
export interface WispAPICore {
    domain: string;
    uuid: string;
    token: string;
    logger: any;
}
/**
 * The Core of the API, handling low-level operations such as making requests and setting the server UUID
 *
 * @public
 */
export declare class WispAPICore {
    constructor(domain: string, uuid: string, token: string, logger: any);
    /**
     * Sets the Server UUID
     *
     * @remarks
     * ℹ️  This can be updated at any time, making all future API calls reference the new Server UUID
     *
     * @public
     */
    setUUID(uuid: string): void;
    /**
     * Generates a URL for the given path
     *
     * @param path The API path
     *
     * @internal
     */
    makeURL(path: string): string;
    /**
     * Makes a request with the headers and request data set automatically.
     *
     * @remarks
     * The data field is formatted appropriately for whichever request type is given.
     *
     * @param method A standared request method.
     * @param path The API path to send the request to.
     * @param data The data to include with the request.
     *
     * @internal
     */
    makeRequest(method: RequestTypes, path: string, data?: any): Promise<Response>;
}
