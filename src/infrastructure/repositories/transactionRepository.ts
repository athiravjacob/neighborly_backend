import { TransactionHistory } from "../../domain/entities/TransactionHistory";
import { ITransactionRepository } from "../../domain/interface/repositories/ITransactionRepository";
import { TransactionDetails } from "../../shared/types/TransactionDetails";
import { transactionModel } from "../model/transactionModel";

export class TransactionRepository implements ITransactionRepository {
  async getHistory(neighborId: string): Promise<TransactionDetails[]|[]> {
    if (!neighborId || typeof neighborId !== 'string') {
      throw new Error('Invalid neighborId');
    }
  
    try {
      const transactions = await transactionModel
        .find({ neighborId })
        .lean() 
        .exec();
  
      return transactions.map((transaction) => ({
        id: transaction._id.toString(),
        userId: transaction.userId.toString(),
        neighborId: transaction.neighborId.toString(),
        taskId: transaction.taskId.toString(),
        stripeTransactionId: transaction.stripeTransactionId,
        amount: transaction.amount,
        transactionDate: transaction.createdAt, 
      }));
    } catch (error) {
      console.error(`Failed to fetch transaction history for neighborId ${neighborId}:`, error);
      throw new Error('Unable to retrieve transaction history');
    }
  }

  async saveTransaction(paymentDetails: TransactionDetails): Promise<string> {
    try {
      const transaction = await transactionModel.create(paymentDetails);
      return transaction._id.toString();
    } catch (error) {
      throw new Error("error adding details to transaction");
    }
  }
}