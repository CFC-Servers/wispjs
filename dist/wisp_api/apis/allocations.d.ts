import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
/**
 * An Allocation object
 *
 * @internal
 */
export type Allocation = {
    object: "allocation";
    /**
     * An Allocation's attributes
     *
     * @param id The ID of the Allocation
     * @param primary Whether or not this Allocation is the Server's primary Allocation
     * @param ip The IP of the Allocation
     * @param port the port of the Allocation
     */
    attributes: {
        id: number;
        primary: boolean;
        ip: string;
        port: number;
    };
};
/**
 * The response object from the GetAllocations call
 *
 * @remarks
 * Used in {@link AllocationsAPI.List}
 */
export type GetAllocationsResponse = {
    object: "list";
    data: Allocation[];
    meta: {
        pagination: PaginationData;
    };
};
/**
 * Handles the listing and updating of a Server's IP/Port Allocations
 *
 * @public
 */
export declare class AllocationsAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Lists all Allocations for the Server
     *
     * @public
     */
    List(): Promise<GetAllocationsResponse>;
    /**
     * Sets the new primary Allocation for the server
     *
     * @param id Allocation ID of the new primary allocation
     *
     * @public
     */
    Update(id: string): Promise<Allocation>;
}
