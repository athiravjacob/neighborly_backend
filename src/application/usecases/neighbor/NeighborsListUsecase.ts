import { Neighbor } from "../../../domain/entities/Neighbor";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { NeighborInfo } from "../../../shared/types/NeighborsDTO";

export class NeighborsListUsecase{
    constructor(
        private neighborRepository:INeighborRepository
    ) { }
    
    async getNeighborsList(longitude: number,latitude:number, subCategory: string):Promise<NeighborInfo[]|[]> {
        const neighbors = await this.neighborRepository.getAvailableNeighborsList(longitude, latitude, subCategory)
        console.log(neighbors)
        if (!neighbors) return []
        return neighbors
    }

    async checkServiceLocation(city: string,subCategory:string): Promise<Boolean>{
        return await this.neighborRepository.checkServiceAvailability(city,subCategory)
    }
}