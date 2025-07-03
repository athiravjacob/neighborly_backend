import { IDisputeRepository } from "../../../domain/interface/repositories/IDisputeRepository";
import { DisputeDetails } from "../../../shared/types/DisputeDetails";

export class DisputeUsecase{
    constructor(
        private disputeRepository: IDisputeRepository
    ) { }
        async raiseDispute(disputeDetails: DisputeDetails): Promise <void > {
             await this.disputeRepository.raise_dispute(disputeDetails)
        
    }
    async fetch_all_disputes(): Promise<DisputeDetails[]>{
        return this.disputeRepository.fetch_all_disputes()
    }
    async fetchDispute(taskId: string): Promise<DisputeDetails>{
        return this.disputeRepository.fetch_dispute(taskId) 
    }

    async change_dispute_status(disputeId: string, status: string): Promise<DisputeDetails>{
        return this.disputeRepository.change_dispute_status(disputeId,status)
    }
} 