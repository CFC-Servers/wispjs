/**
 * Handles interactions with Server Schedules
 *
 * @public
 */
export class SchedulesAPI {
    constructor(core) {
        this.core = core;
    }
    /**
     * Retrieves all of the Schedules for the Server
     *
     * @public
     */
    async List() {
        const response = await this.core.makeRequest("GET", "schedules", { include: "tasks" });
        const data = await response.json();
        return data;
    }
    /**
     * Retrieves the Details for the Schedule
     *
     * @param id The ID of the Schedule
     *
     * @public
     */
    async GetDetails(id) {
        const response = await this.core.makeRequest("GET", `schedules/${id}`, { include: "tasks" });
        const data = await response.json();
        return data;
    }
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
    async Create(name, minute, hour, dow, dom, active) {
        const requestData = {
            name: name,
            cron_minute: minute,
            cron_hour: hour,
            cron_day_of_week: dow,
            cron_day_of_month: dom,
            is_active: active
        };
        const response = await this.core.makeRequest("POST", "schedules", requestData);
        const data = await response.json();
        return data;
    }
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
    async Update(id, name, minute, hour, dow, dom, active) {
        const requestData = {
            name: name,
            cron_minute: minute,
            cron_hour: hour,
            cron_day_of_week: dow,
            cron_day_of_month: dom,
            is_active: active
        };
        const response = await this.core.makeRequest("PATCH", `schedules/${id}`, requestData);
        const data = await response.json();
        return data;
    }
    /**
     * Triggers the Schedule
     *
     * @param id The ID of the Schedule
     *
     * @public
     */
    async Trigger(id) {
        await this.core.makeRequest("POST", `schedules/${id}`);
    }
    /**
     * Deletes the Schedule
     *
     * @param id The ID of the Schedule
     *
     * @public
     */
    async Delete(id) {
        await this.core.makeRequest("DELETE", `schedules/${id}`);
    }
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
    async CreateTask(id, action, timeOffset, payload) {
        const requestData = {
            action: action,
            time_offset: timeOffset,
            payload: payload
        };
        const response = await this.core.makeRequest("POST", `schedules/${id}/tasks`, requestData);
        const data = await response.json();
        return data;
    }
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
    async UpdateTask(scheduleID, taskID, action, timeOffset, payload) {
        const requestData = {
            action: action,
            time_offset: timeOffset,
            payload: payload
        };
        const response = await this.core.makeRequest("PATCH", `schedules/${scheduleID}/tasks/${taskID}`, requestData);
        const data = await response.json();
        return data;
    }
    /**
     * Delete the Task
     *
     * @param scheduleID The ID of the Schedule that contains the Task
     * @param taskID The ID of the Task
     *
     * @public
     */
    async DeleteTask(scheduleID, taskID) {
        await this.core.makeRequest("DELETE", `schedules/${scheduleID}/tasks/${taskID}`);
    }
}
