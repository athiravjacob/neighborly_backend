import { IEscrowRepository } from "../../domain/interface/repositories/IEscrowRepository";
import { escrowModel } from "../model/EscrowModel";

export class EscrowRepository implements IEscrowRepository{
    async pendingPayment(transactionId: string): Promise<string> {
        try {
            const escrow = await escrowModel.create(transactionId)
            return JSON.stringify(escrow._id)

        } catch (error) {
            throw new Error("Error updating escrow account")
        }    }
    

} 