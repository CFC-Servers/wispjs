import { WispAPICore } from "./index";
/**
 * Handles the syncing of the FastDL feature
 *
 * @public
 */
export declare class FastDLAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Begins a FastDL Sync for the server
     *
     * @remarks
     * ⚠️  If a Sync is already in progress, this function will succeed even though the process will fail.
     *
     * @public
     */
    Sync(): Promise<void>;
}
