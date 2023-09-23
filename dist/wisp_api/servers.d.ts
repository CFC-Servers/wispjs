import { WispAPICore } from "./index";
export type PowerRequest = "start" | "stop" | "restart" | "kill";
export declare class ServersAPI {
    private core;
    constructor(core: WispAPICore);
    SendCommand(command: string): Promise<boolean>;
    GetWebsocketDetails(): Promise<any>;
    SetName(name: string): Promise<Response>;
    GetDetails(): Promise<Response>;
    GetResources(): Promise<Response>;
    PowerRequest(action: PowerRequest): Promise<Response>;
}
