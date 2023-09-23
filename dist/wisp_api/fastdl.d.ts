import { WispAPICore } from "./index";
export declare class FastDLAPI {
    private core;
    constructor(core: WispAPICore);
    Sync(): Promise<Response>;
}
