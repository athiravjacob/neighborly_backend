import { Neighbor } from "../../../domain/entities/Neighbor";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";

export class SaveAvailability{
    constructor(
        private neighborRepository: INeighborRepository,
    ) { }
    
    async execute(id: string, availability: Neighbor['availability']): Promise<Neighbor> {
      
        const updatedNeighbor = await this.neighborRepository.saveAvailabilty(id, availability);
        return updatedNeighbor;
      }
}