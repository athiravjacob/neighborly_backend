import { Schedule } from "../../../shared/types/Schedule";

export interface IScheduleRepository{
    saveNeighborSchedules(schedule: Schedule): Promise<Schedule>
    getNeighborSchedule(neighborId:String):Promise<Schedule>
}