import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
export type Allocation = {
    object: "allocation";
    attributes: {
        primary: boolean;
        ip: string;
        alias: string;
        port: number;
    };
};
export type GetAllocationsResponse = {
    object: "list";
    data: Allocation[];
    meta: {
        pagination: PaginationData;
    };
};
export declare class AllocationsAPI {
    private core;
    constructor(core: WispAPICore);
    List(): Promise<GetAllocationsResponse>;
    Update(id: string): Promise<Response>;
}
