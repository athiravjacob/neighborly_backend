import { Neighbor } from "../../../domain/entities/Neighbor";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { SkillsDTO } from "../../../shared/types/SkillsDTO";

export class SkillsUsecase{
    constructor(
        private neighborRepository :INeighborRepository
    ) { }
    
    async saveSkills(id:string,skill: SkillsDTO): Promise<Neighbor>{
        return await this.neighborRepository.saveSkills(id,skill)
    }
}