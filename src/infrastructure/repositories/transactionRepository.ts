import { TransactionHistory } from "../../domain/entities/TransactionHistory";
import { ITransactionRepository } from "../../domain/interface/repositories/ITransactionRepository";
import { TransactionDetails } from "../../shared/types/TransactionDetails";
import { transactionModel } from "../model/transactionModel";

export class TransactionRepository implements ITransactionRepository {
  async get_all_transactions(): Promise<TransactionDetails[] | []> {
    const transactions = await transactionModel.find()
    return JSON.parse(JSON.stringify(transactions))
  }
  async get_neighbor_transactions(neighborId: string): Promise<TransactionDetails[]|[]> {
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
        base_amount: transaction.base_amount,
        platform_fee:transaction.platform_fee,
        total_amount: transaction.total_amount,
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