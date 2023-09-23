import { WispAPICore } from "./index";
export type UpdateStartup = {
    environment: {
        [key: string]: any;
    };
};
export type StartupDetail = {
    object: "server_variable";
    attributes: {
        name: string;
        description: string;
        env_variable: string;
        default_value: string;
        tickable: boolean;
        user_editable: boolean;
        rules: string;
        server_value: string;
    };
};
export type StartupDetails = {
    object: "list";
    data: StartupDetail[];
    meta: {
        startup_command: string;
    };
};
export declare class StartupAPI {
    private core;
    constructor(core: WispAPICore);
    Get(): Promise<StartupDetails>;
    Update(startup: UpdateStartup): Promise<Response>;
}
