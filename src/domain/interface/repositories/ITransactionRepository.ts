import { TransactionDetails } from "../../../shared/types/TransactionDetails";
import { TransactionHistory } from "../../entities/TransactionHistory";

export interface ITransactionRepository{
    saveTransaction(paymentDetails: TransactionDetails): Promise<string>
    getHistory(neighborId:string):Promise<TransactionDetails[]|[]>
} 