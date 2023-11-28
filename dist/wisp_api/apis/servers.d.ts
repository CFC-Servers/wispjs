import { WispAPICore } from "./index";
export type PowerRequest = "start" | "stop" | "restart" | "kill";
export type GetDetailsResponse = {
    object: "server";
    attributes: {
        id: number;
        uuid: string;
        uuid_short: string;
        name: string;
        description: string | null;
        monitor: boolean;
        support_op: boolean;
        installed: number;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
        };
        feature_limits: {
            databases: number;
            backup_megabytes: number;
        };
    };
};
export type GetWebsocketDetailsResponse = {
    url: string;
    upload_url: string;
    token: string;
};
export type GetResourcesResponse = {
    status: number;
    proc: {
        memory: {
            total: number;
            limit: number;
        };
        cpu: {
            total: number;
            limit: number;
        };
        disk: {
            used: number;
            limit: number;
            io_limit: number;
        };
        network: {
            [key: string]: {
                rx_bytes: number;
                rx_packets: number;
                rx_errors: number;
                rx_dropped: number;
                tx_bytes: number;
                tx_packets: number;
                tx_errors: number;
                tx_dropped: number;
            };
        };
    };
};
/**
 * Handles generic Server interaction, such as Sending Commands, managing Power State, and getting Details
 *
 * @public
 */
export declare class ServersAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Sends a command to the Server
     *
     * @param command The full command string to send to the Server
     *
     * @public
     */
    SendCommand(command: string): Promise<void>;
    /**
     * Gets the Websocket connection (and upload) details for the Server
     *
     * @public
     */
    GetWebsocketDetails(): Promise<GetWebsocketDetailsResponse>;
    /**
     * Sets the name of the Server as it appears in the panel
     * (Same thing as setting the name in the "Server Details" menu)
     *
     * @param name The new name of the server
     *
     * @public
     */
    SetName(name: string): Promise<GetDetailsResponse>;
    /**
     * Retrieves the basic, technical details of the Server
     *
     * @public
     */
    GetDetails(): Promise<GetDetailsResponse>;
    /**
     * Retrieves technical details of the Server's resources
     * (CPU, Memory, Disk, Network)
     *
     * @public
     */
    GetResources(): Promise<GetResourcesResponse>;
    /**
     * Instructs the Server to start up, shut down, restart, or force quit
     *
     * @example
     * Example of stopping the server
     * ```
     * await wisp.api.PowerRequest("stop");
     * ```
     *
     * @param action The power action to send. One of: ["start", "stop", "restart", "kill"]
     *
     * @public
     */
    PowerRequest(action: PowerRequest): Promise<void>;
}
