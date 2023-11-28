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
export declare class ServersAPI {
    private core;
    constructor(core: WispAPICore);
    SendCommand(command: string): Promise<void>;
    GetWebsocketDetails(): Promise<GetWebsocketDetailsResponse>;
    SetName(name: string): Promise<GetDetailsResponse>;
    GetDetails(): Promise<GetDetailsResponse>;
    GetResources(): Promise<GetResourcesResponse>;
    PowerRequest(action: PowerRequest): Promise<void>;
}
