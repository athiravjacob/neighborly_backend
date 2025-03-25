import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { neighborRepository } from "../../../infrastructure/repositories/neighborRepository";
import { TimeslotDTO } from "../../../shared/types/TimeslotDTO";

export class TimeslotUsecase{
    constructor(
        private neighborRepository:INeighborRepository
    ) { }
    
    async getTimeslots(id: string): Promise<TimeslotDTO[]|null>{
        const result = await this.neighborRepository.getavailableTimeslot(id)
        console.log(result)
        return result
    }
}