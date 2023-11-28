import { WispAPI } from "./wisp_api/index.js";
import { WispSocket } from "./wisp_socket/index.js";
export interface WispInterface {
    socket: WispSocket;
    api: WispAPI;
    logger: any;
}
/**
 * The primary Wisp Interface, exposing interactions with both the HTTP and Websockets API
 *
 * @param domain The Domain of the Pterodactyl/Wisp panel (e.g. `my.gamepanel.gg`)
 * @param uuid The UUID of the server to reference in all API requests
 * @param token The panel API token to use for authorization
 *
 * @public
 */
export declare class WispInterface {
    constructor(domain: string, uuid: string, token: string);
    /**
     * Establish a Websocket connection with the panel. Required to make Websocket API requests.
     *
     * @remarks
     * ℹ️  `this.socket` is available only after calling this function.
     *
     * @param ghPAT The Github Personal Access Token used for Cloning/Pulling of private repositories
     *
     * @public
     */
    connect(ghPAT: string): Promise<void>;
    /**
     * Manually disconnects from the Websocket connection.
     *
     * @public
     */
    disconnect(): Promise<void>;
}
