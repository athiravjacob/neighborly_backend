import { Neighbor } from "../../../domain/entities/Neighbor";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";

export class SaveAvailability{
    constructor(
        private neighborRepository: INeighborRepository,
    ) { }
    
    async execute(id: string, availability: Neighbor['availability']): Promise<Neighbor> {
        console.log('UseCase: Executing with ID:', id);
        console.log('UseCase: Availability:', JSON.stringify(availability, null, 2));
    
        const updatedNeighbor = await this.neighborRepository.saveAvailabilty(id, availability);
        return updatedNeighbor;
      }
}