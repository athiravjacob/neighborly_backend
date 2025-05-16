import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";

export class BanUsecase{
    constructor(
        private neighborRepository: INeighborRepository,
        private userRepository: IUserRepository,
    ) { }

    async handleBan_user(id: string): Promise<Boolean>{
        return await this.userRepository.ban_or_unban(id)
    }

    async handleBan_neighbor(id: string): Promise<Boolean>{
        return await this.neighborRepository.ban_or_unban(id)

    }

}