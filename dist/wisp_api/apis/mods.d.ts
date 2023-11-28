import { WispAPICore } from "./index";
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
/**
 * Handles Listing and Installating of Mods
 *
 * @public
 */
export declare class ModsAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Lists all Mods available to the Server
     *
     * @public
     */
    List(): Promise<GetModsResponse>;
    /**
     * Installs or Uninstalls the Mod with the given id
     *
     * @param id The ID of the Mod to Install/Uninstall
     *
     * @public
     */
    ToggleInstall(id: string): Promise<void>;
}
