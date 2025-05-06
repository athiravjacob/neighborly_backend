import { IEscrowRepository } from "../../domain/interface/repositories/IEscrowRepository";
import { escrowModel } from "../model/escrowModel";

export class EscrowRepository implements IEscrowRepository {
    async pendingPayment(transactionId: string, neighborId: string,amount:number): Promise<string> {
        try {
            const escrow = await escrowModel.create({ 
                transactionId, 
                neighborId,
                amount
            });
            console.log(escrow);
            return escrow._id.toString();
        } catch (error) {
            console.log(error)
            throw new Error("Error creating escrow account");
        }
    }
}