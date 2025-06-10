import { IScheduleRepository } from "../../domain/interface/repositories/IScheduleRepository";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { Schedule } from "../../shared/types/Schedule";
import { AppError } from "../../shared/utils/errors";
import { scheduleModel } from "../model/scheduleModel";

export class scheduleRepository implements IScheduleRepository{
    async getNeighborSchedule(neighborId: String): Promise<Schedule> {
        console.log("getting neighbor weekly schedule")
        const neighborSchedule = await scheduleModel.findOne({ neighborId })
        return neighborSchedule ? JSON.parse(JSON.stringify(neighborSchedule)) : { neighborId, availability: [] }

    }

    async saveNeighborSchedules(schedule: Schedule): Promise<Schedule> {
        const { neighborId, availability } = schedule
        const neighborSchedule = await scheduleModel.findOneAndUpdate(
            { neighborId },
            { $set: { neighborId, availability } }, 
            { new: true, runValidators: true, upsert: true }
        );
        console.log(neighborSchedule)
        return JSON.parse(JSON.stringify(neighborSchedule))
    }

}