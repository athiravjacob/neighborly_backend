import { IDisputeRepository } from "../../domain/interface/repositories/IDisputeRepository";
import { DisputeDetails } from "../../shared/types/DisputeDetails";
import { ComplaintModel } from "../model/complaintModel";

export class disputeRepository implements IDisputeRepository{
    async raise_dispute(disputeDetails: DisputeDetails): Promise<void> {
        await ComplaintModel.create(disputeDetails)
    }
    async change_dispute_status(disputeId: string,dispute_status:string): Promise<DisputeDetails> {
        const dispute = await ComplaintModel.findByIdAndUpdate({ _id: disputeId }, { dispute_status })
        return JSON.parse(JSON.stringify(dispute))
    }
    async fetch_dispute(taskId: string): Promise<DisputeDetails> {
        const disputeDetails = await ComplaintModel.findOne({ taskId }).populate([{ path: "reportedBy", select: "name" }, { path: "taskId" }])
        return JSON.parse(JSON.stringify(disputeDetails))
    }
    async fetch_all_disputes(): Promise<DisputeDetails[]> {
        const disputes = await ComplaintModel.find().populate([{ path: "reportedBy", select: "name" }, { path: "taskId" }])

        return JSON.parse(JSON.stringify(disputes))
    }

}