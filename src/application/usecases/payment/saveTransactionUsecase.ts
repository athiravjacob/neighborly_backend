import { string } from "joi";
import { IEscrowRepository } from "../../../domain/interface/repositories/IEscrowRepository";
import { ITransactionRepository } from "../../../domain/interface/repositories/ITransactionRepository";
import { IWalletRepository } from "../../../domain/interface/repositories/IWalletRepository";
import { TransactionDetails } from "../../../shared/types/TransactionDetails";
import { ITaskRepository } from "../../../domain/interface/repositories/ITaskRepository";
import { TransactionHistory } from "../../../domain/entities/TransactionHistory";
import { IBookingRepository } from "../../../domain/interface/repositories/IBookingRepository";

export class saveTransaction{
    constructor(
        private TransactionRepository: ITransactionRepository,
        private EscrowRepository: IEscrowRepository,
        private WalletRepository: IWalletRepository,
        private TaskRepository: ITaskRepository,
        private BookingRepository:IBookingRepository
    ) { }
    
    async execute(paymentDetails:TransactionDetails): Promise<void>{
        const transactionId = await this.TransactionRepository.saveTransaction(paymentDetails)
        const updatePaymentStatus = await this.TaskRepository.updatePaymentStatus(paymentDetails.taskId, "paid")
        await this.BookingRepository.updateBookingStatus(paymentDetails.taskId,paymentDetails.neighborId,"confirmed")
           
    }

    async transactionHistory(): Promise<TransactionDetails[] | []>{
        const transactions = await this.TransactionRepository.get_all_transactions()
        return transactions
    }

    async neighborTransactions(id: string): Promise<TransactionDetails[]|[]>{
        const transactions = await this.TransactionRepository.get_neighbor_transactions(id)
        return transactions
    }

    async get_total_revenue(): Promise<>{
        const total_revenue = await this.TransactionRepository.get_revenue_report()
        return total_revenue
    }
}