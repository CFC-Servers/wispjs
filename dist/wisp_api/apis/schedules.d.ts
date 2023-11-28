import { WispAPICore } from "./index";
import type { PaginationData } from "./index";
/**
 * A Cron-formatted scheduling object
 *
 * @internal
 */
export interface CronSchedule {
    minute: string;
    hour: string;
    day_of_week: string;
    day_of_month: string;
}
export interface Schedule {
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
}
/**
 * A response object for the GetSchedule call
 *
 * @remarks
 * Used in {@link SchedulesAPI.List}
 *
 * @public
 */
export interface GetSchedulesResponse {
    object: "list";
    data: Schedule[];
    meta: {
        pagination: PaginationData;
    };
}
export interface CreateScheduleRequest {
    name: string;
    cron_minute: string;
    cron_hour: string;
    cron_day_of_week: string;
    cron_day_of_month: string;
    is_active: boolean;
}
export interface ScheduleTask {
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
}
export type ScheduleTaskAction = "command" | "power" | "backup";
export interface CreateScheduleTaskRequest {
    action: ScheduleTaskAction;
    time_offset: number;
    payload: string | null;
}
/**
 * Handles interactions with Server Schedules
 *
 * @public
 */
export declare class SchedulesAPI {
    private core;
    constructor(core: WispAPICore);
    /**
     * Retrieves all of the Schedules for the Server
     *
     * @public
     */
    List(): Promise<GetSchedulesResponse>;
    /**
     * Retrieves the Details for the Schedule
     *
     * @param id The ID of the Schedule
     *
     * @public
     */
    GetDetails(id: string): Promise<Schedule>;
    /**
     * Creates a new Schedule
     *
     * @example
     * Creates a Schedule that runs at 12am every day
     * ```
     * await wisp.api.Schedules.Create("Example", "0", "0", "*", "*", true);
     * ```
     *
     * @param name The name of the Schedule
     * @param minute The Cron minute string
     * @param hour The Cron hour string
     * @param dow The Cron day of week string
     * @param dom The Cron day of month string
     * @param active Whether to enable the Schedle on creation
     *
     * @public
     */
    Create(name: string, minute: string, hour: string, dow: string, dom: string, active: boolean): Promise<Schedule>;
    /**
     * Updates the values of the Schedule
     *
     * @param id The ID of the Schedule
     * @param name The name of the Schedule
     * @param minute The Cron minute string
     * @param hour The Cron hour string
     * @param dow The Cron day of week string
     * @param dom The Cron day of month string
     * @param active Whether to enable the Schedle on creation
     *
     * @public
     */
    Update(id: string, name: string, minute: string, hour: string, dow: string, dom: string, active: boolean): Promise<Schedule>;
    /**
     * Triggers the Schedule
     *
     * @param id The ID of the Schedule
     *
     * @public
     */
    Trigger(id: string): Promise<void>;
    /**
     * Deletes the Schedule
     *
     * @param id The ID of the Schedule
     *
     * @public
     */
    Delete(id: string): Promise<void>;
    /**
     * Creates a new Task for a Schedule
     *
     * @remarks
     * ℹ️  Payload is not required for backup action!
     *
     * @param id The ID of the Schedule to create a Task for
     * @param action The Task action. One of: ["command", "power", "backup"]
     * @param timeOffset The time offset of the Task
     * @param payload The payload to provide to the Task
     *
     * @public
     */
    CreateTask(id: string, action: ScheduleTaskAction, timeOffset: number, payload: string | null): Promise<ScheduleTask>;
    /**
     * Update the Task
     *
     * @remarks
     * ℹ️  Payload is not required for backup action!
     *
     * @param scheduleID The ID of the Schedule that contains the Task
     * @param taskID The ID of the Task
     * @param action The Task action. One of: ["command", "power", "backup"]
     * @param timeOffset The time offset of the Task
     * @param payload The payload to provide to the Task
     *
     * @public
     */
    UpdateTask(scheduleID: string, taskID: string, action: ScheduleTaskAction, timeOffset: number, payload: string | null): Promise<ScheduleTask>;
    /**
     * Delete the Task
     *
     * @param scheduleID The ID of the Schedule that contains the Task
     * @param taskID The ID of the Task
     *
     * @public
     */
    DeleteTask(scheduleID: string, taskID: string): Promise<void>;
}
