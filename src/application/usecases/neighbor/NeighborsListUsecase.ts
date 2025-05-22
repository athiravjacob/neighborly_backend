import { Neighbor } from "../../../domain/entities/Neighbor";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { NeighborInfo } from "../../../shared/types/NeighborsDTO";

export class NeighborsListUsecase{
    constructor(
        private neighborRepository:INeighborRepository
    ) { }
    
    async getNeighborsList(city: string, subCategory: string):Promise<NeighborInfo[]|[]> {
        const neighbors = await this.neighborRepository.getAvailableNeighborsList(city, subCategory)
        if (!neighbors) return []
        return neighbors
    }

    async checkServiceLocation(city: string,subCategory:string): Promise<Boolean>{
        return await this.neighborRepository.checkServiceAvailability(city,subCategory)
    }
}