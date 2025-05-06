import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";

export class verificationUsecase{
    constructor(
        private neighborRepository :INeighborRepository
    ) { }
    
    async verifyId(neighborId:string): Promise<void>{
        await this.neighborRepository.verifyNeighbor(neighborId)
    }
}