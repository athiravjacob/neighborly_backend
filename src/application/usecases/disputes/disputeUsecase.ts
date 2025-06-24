import { IDisputeRepository } from "../../../domain/interface/repositories/IDisputeRepository";
import { DisputeDetails } from "../../../shared/types/DisputeDetails";

export class DisputeUsecase{
    constructor(
        private disputeRepository: IDisputeRepository
    ) { }
        async raiseDispute(disputeDetails: DisputeDetails): Promise <void > {
             await this.disputeRepository.raise_dispute(disputeDetails)
        
    }
    async fetchDispute(taskId: string): Promise<DisputeDetails>{
        return this.disputeRepository.fetch_dispute(taskId)
        
    }
} 