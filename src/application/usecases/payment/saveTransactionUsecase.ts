import { string } from "joi";
import { IEscrowRepository } from "../../../domain/interface/repositories/IEscrowRepository";
import { ITransactionRepository } from "../../../domain/interface/repositories/ITransactionRepository";
import { IWalletRepository } from "../../../domain/interface/repositories/IWalletRepository";
import { TransactionDetails } from "../../../shared/types/TransactionDetails";

export class saveTransaction{
    constructor(
        private TransactionRepository: ITransactionRepository,
        private EscrowRepository: IEscrowRepository,
        private WalletRepository :IWalletRepository
    ) { }
    
    async execute(paymentDetails:TransactionDetails): Promise<void>{
        const transactionId = await this.TransactionRepository.saveTransaction(paymentDetails)
        const escrowId = await this.EscrowRepository.pendingPayment(transactionId,paymentDetails.neighborId,paymentDetails.amount)
        const updateWallet = await this.WalletRepository.updateWalletBalance(paymentDetails.neighborId,paymentDetails.amount)
        
           
    }
}