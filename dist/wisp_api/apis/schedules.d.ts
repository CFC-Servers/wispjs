import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
export type CronSchedule = {
    minute: string;
    hour: string;
    day_of_week: string;
    day_of_month: string;
};
export type Schedule = {
    object: "schedule";
    attributes: {
        id: number;
        name: string;
        cron: CronSchedule;
        is_active: boolean;
        is_processing: boolean;
        last_run_at: string | null;
        next_run_at: string | null;
        created_at: string;
        updated_at: string;
    };
};
export type GetSchedulesResponse = {
    object: "list";
    data: Schedule[];
    meta: {
        pagination: PaginationData;
    };
};
export type CreateScheduleRequest = {
    name: string;
    cron_minute: string;
    cron_hour: string;
    cron_day_of_week: string;
    cron_day_of_month: string;
    is_active: boolean;
};
export type ScheduleTask = {
    object: "schedule_task";
    attributes: {
        id: number;
        sequence_id: number;
        action: string;
        payload: string;
        time_offset: string;
        is_processing: boolean;
        created_at: string;
        updated_at: string;
    };
};
export type ScheduleTaskAction = "command" | "power" | "backup";
export type CreateScheduleTaskRequest = {
    action: ScheduleTaskAction;
    time_offset: number;
    payload: string | null;
};
export declare class SchedulesAPI {
    private core;
    constructor(core: WispAPICore);
    List(): Promise<GetSchedulesResponse>;
    GetDetails(id: string): Promise<Schedule>;
    Create(name: string, minute: string, hour: string, dow: string, dom: string, active: boolean): Promise<Schedule>;
    Update(id: string, name: string, minute: string, hour: string, dow: string, dom: string, active: boolean): Promise<Schedule>;
    Trigger(id: string): Promise<Response>;
    Delete(id: string): Promise<Response>;
    CreateTask(id: string, action: ScheduleTaskAction, timeOffset: number, payload: string | null): Promise<ScheduleTask>;
    UpdateTask(scheduleID: string, taskID: string, action: ScheduleTaskAction, timeOffset: number, payload: string | null): Promise<ScheduleTask>;
    DeleteTask(scheduleID: string, taskID: string): Promise<Response>;
}
