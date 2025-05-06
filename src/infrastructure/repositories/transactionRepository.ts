import { ITransactionRepository } from "../../domain/interface/repositories/ITransactionRepository";
import { TransactionDetails } from "../../shared/types/TransactionDetails";
import { transactionModel } from "../model/transactionModel";

export class TransactionRepository implements ITransactionRepository {
  async saveTransaction(paymentDetails: TransactionDetails): Promise<string> {
    try {
      const transaction = await transactionModel.create(paymentDetails);
      return transaction._id.toString();
    } catch (error) {
      throw new Error("error adding details to transaction");
    }
  }
}