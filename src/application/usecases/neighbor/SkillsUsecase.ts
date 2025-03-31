import { Neighbor } from "../../../domain/entities/Neighbor";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { SkillsDTO } from "../../../shared/types/SkillsDTO";

export class SkillsUsecase{
    constructor(
        private neighborRepository :INeighborRepository
    ) { }
    
    async saveSkills(id:string,skill: SkillsDTO): Promise<SkillsDTO[]>{
        return await this.neighborRepository.saveSkills(id,skill)
    }

    async getSkills(id: string): Promise<SkillsDTO[] | null>{
        return await this.neighborRepository.getSkills(id)
    }
}