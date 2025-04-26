import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { AppError } from "../../../shared/utils/errors";

export class NeighborProfileUsecase{
    constructor(
        private neighborRepository: INeighborRepository
    ) { }
    
    async uploadIdUrl(id:string,idCardImage: string): Promise<Boolean>{
        try {
            const status = await this.neighborRepository.uploadId(id, idCardImage)
            return status
        } catch (error) {
            throw new AppError(400,"Error uploading Id card")
        }
    }

    async fetchStatus(id: string): Promise<Boolean>{
        try {
            return await this.neighborRepository.fetchVerifyStatus(id)
        } catch (error) {
            throw new AppError(400,"Error uploading Id card")

        }
    }
}