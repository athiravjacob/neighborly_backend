import { string } from "joi";
import { IEscrowRepository } from "../../../domain/interface/repositories/IEscrowRepository";
import { ITransactionRepository } from "../../../domain/interface/repositories/ITransactionRepository";
import { IWalletRepository } from "../../../domain/interface/repositories/IWalletRepository";
import { TransactionDetails } from "../../../shared/types/TransactionDetails";
import { ITaskRepository } from "../../../domain/interface/repositories/ITaskRepository";
import { TransactionHistory } from "../../../domain/entities/TransactionHistory";

export class saveTransaction{
    constructor(
        private TransactionRepository: ITransactionRepository,
        private EscrowRepository: IEscrowRepository,
        private WalletRepository: IWalletRepository,
        private TaskRepository:ITaskRepository
    ) { }
    
    async execute(paymentDetails:TransactionDetails): Promise<void>{
        const transactionId = await this.TransactionRepository.saveTransaction(paymentDetails)
        const escrowId = await this.EscrowRepository.pendingPayment(transactionId,paymentDetails.neighborId,paymentDetails.amount)
        const updateWallet = await this.WalletRepository.updateWalletBalance(paymentDetails.neighborId,paymentDetails.amount)
        const updatePaymentStatus = await this.TaskRepository.updatePaymentStatus(paymentDetails.taskId,"paid")
           
    }

    async neighborTransactions(id: string): Promise<TransactionDetails[]|[]>{
        const transactions = await this.TransactionRepository.getHistory(id)
        return transactions
    }
}