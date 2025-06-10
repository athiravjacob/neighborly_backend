import { Neighbor } from "../../../domain/entities/Neighbor";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { IScheduleRepository } from "../../../domain/interface/repositories/IScheduleRepository";
import { Schedule } from "../../../shared/types/Schedule";

export class WeeklySchedule{
    constructor(
        private scheduleRepository: IScheduleRepository,
    ) { }
    
    async saveAvailability( availability: Schedule): Promise<Schedule> {
      
        const Schedule = await this.scheduleRepository.saveNeighborSchedules(availability);
        return Schedule;
    }
    
    async getAvailability(neighborId: string): Promise<Schedule>{
        const Schedule = await this.scheduleRepository.getNeighborSchedule(neighborId)
        return Schedule
    } 
}