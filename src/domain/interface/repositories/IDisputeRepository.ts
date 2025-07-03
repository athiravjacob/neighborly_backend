import { DisputeDetails } from "../../../shared/types/DisputeDetails";

export interface IDisputeRepository{
    raise_dispute(disputeDetails: DisputeDetails): Promise<void>
    change_dispute_status(disputeId: string,dispute_status:string): Promise<DisputeDetails>
    fetch_dispute(disputeId: string): Promise<DisputeDetails>
    fetch_all_disputes():Promise<DisputeDetails[]>
    
}