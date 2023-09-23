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
export declare class ModsAPI {
    private core;
    constructor(core: WispAPICore);
    List(search?: string | null): Promise<GetModsResponse>;
    Install(id: string): Promise<Response>;
}
