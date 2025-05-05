import { TransactionDetails } from "../../../shared/types/TransactionDetails";

export interface ITransactionRepository{
    saveTransaction(paymentDetails:TransactionDetails):Promise<string>
} 