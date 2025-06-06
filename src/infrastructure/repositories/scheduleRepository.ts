import { IScheduleRepository } from "../../domain/interface/repositories/IScheduleRepository";
import { Schedule } from "../../shared/types/Schedule";
import { scheduleModel } from "../model/scheduleModel";

export class scheduleRepository implements IScheduleRepository{
    async getNeighborSchedule(neighborId: String): Promise<Schedule | undefined> {
        const neighborSchedule = await scheduleModel.findOne({ neighborId })
        if (!neighborSchedule) return undefined
        return JSON.parse(JSON.stringify(neighborSchedule))

    }

    async saveNeighborSchedules(schedule: Schedule): Promise<Schedule> {
        const { neighborId, availability } = schedule
        const neighborSchedule = await scheduleModel.findOneAndUpdate(
            { neighborId },
            { $set: { neighborId, availability } }, // Include neighborId in $set to ensure it’s set for new documents
            { new: true, runValidators: true, upsert: true }
        );
        console.log(neighborSchedule)
        return JSON.parse(JSON.stringify(neighborSchedule))
    }

}