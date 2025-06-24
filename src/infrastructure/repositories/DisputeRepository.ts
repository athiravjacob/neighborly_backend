import { IDisputeRepository } from "../../domain/interface/repositories/IDisputeRepository";
import { DisputeDetails } from "../../shared/types/DisputeDetails";
import { ComplaintModel } from "../model/complaintModel";

export class disputeRepository implements IDisputeRepository{
    async raise_dispute(disputeDetails: DisputeDetails): Promise<void> {
        await ComplaintModel.create(disputeDetails)
    }
    change_dispute_status(disputeId: string): Promise<DisputeDetails> {
        throw new Error("Method not implemented.");
    }
    async fetch_dispute(taskId: string): Promise<DisputeDetails> {
        const disputeDetails = await ComplaintModel.find({taskId})
        return JSON.parse(JSON.stringify(disputeDetails))
    }
    fetch_all_disputes(): Promise<DisputeDetails[]> {
        throw new Error("Method not implemented.");
    }

}