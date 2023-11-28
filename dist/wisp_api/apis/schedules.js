export class SchedulesAPI {
    constructor(core) {
        this.core = core;
    }
    // [GET] /api/client/servers/<UUID>/schedules
    async List() {
        const response = await this.core.makeRequest("GET", "schedules", { include: "tasks" });
        const data = await response.json();
        return data;
    }
    // [GET] /api/client/servers/<UUID>/schedules/<ID>
    async GetDetails(id) {
        const response = await this.core.makeRequest("GET", `schedules/${id}`, { include: "tasks" });
        const data = await response.json();
        return data;
    }
    // [POST] /api/client/servers/<UUID>/schedules
    async Create(name, minute, hour, dow, dom, active) {
        const data = {
            name: name,
            cron_minute: minute,
            cron_hour: hour,
            cron_day_of_week: dow,
            cron_day_of_month: dom,
            is_active: active
        };
        const response = await this.core.makeRequest("POST", "schedules", data);
        const responseData = await response.json();
        return responseData;
    }
    // [PATCH] /api/client/servers/<UUID>/schedules/<ID>
    async Update(id, name, minute, hour, dow, dom, active) {
        const data = {
            name: name,
            cron_minute: minute,
            cron_hour: hour,
            cron_day_of_week: dow,
            cron_day_of_month: dom,
            is_active: active
        };
        const response = await this.core.makeRequest("PATCH", `schedules/${id}`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [POST] /api/client/servers/<UUID>/schedules/<ID>/trigger
    async Trigger(id) {
        return await this.core.makeRequest("POST", `schedules/${id}`);
    }
    // [DELETE] /api/client/servers/<UUID>/schedules/<ID>
    async Delete(id) {
        return await this.core.makeRequest("DELETE", `schedules/${id}`);
    }
    // [POST] /api/client/servers/<UUID>/schedules/<SCHEDULE_ID>/tasks
    // "Payload is not required for backup action!"
    async CreateTask(id, action, timeOffset, payload) {
        const data = {
            action: action,
            time_offset: timeOffset,
            payload: payload
        };
        const response = await this.core.makeRequest("POST", `schedules/${id}/tasks`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [PATCH] /api/client/servers/<UUID>/schedules/<SCHEDULE_ID>/task/<TASK_ID>
    // "Payload is not required for backup action!"
    async UpdateTask(scheduleID, taskID, action, timeOffset, payload) {
        const data = {
            action: action,
            time_offset: timeOffset,
            payload: payload
        };
        const response = await this.core.makeRequest("PATCH", `schedules/${scheduleID}/tasks/${taskID}`, data);
        const responseData = await response.json();
        return responseData;
    }
    // [DELETE] /api/client/servers/<UUID>/schedules/<SCHEDULE_ID>/task/<TASK_ID>
    async DeleteTask(scheduleID, taskID) {
        return await this.core.makeRequest("DELETE", `schedules/${scheduleID}/tasks/${taskID}`);
    }
}
