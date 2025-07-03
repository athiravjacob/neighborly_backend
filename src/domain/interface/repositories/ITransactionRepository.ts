import { TransactionDetails } from "../../../shared/types/TransactionDetails";
import { TransactionHistory } from "../../entities/TransactionHistory";

export interface ITransactionRepository{
    saveTransaction(paymentDetails: TransactionDetails): Promise<string>
    get_neighbor_transactions(neighborId: string): Promise<TransactionDetails[] | []>
    get_all_transactions():Promise<TransactionDetails[]|[]>
    
}  