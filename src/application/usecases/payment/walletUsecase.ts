import { Wallet } from "../../../domain/entities/Wallet";
import { IWalletRepository } from "../../../domain/interface/repositories/IWalletRepository";
import { WalletDetails } from "../../../shared/types/Wallet";

export class WalletUsecase{
    constructor(
        private walletRepository:IWalletRepository
    ) { }
    
    async fetchNeighborWallet(neighborId: string): Promise<WalletDetails>{
        const wallet = await this.walletRepository.fetchWallet(neighborId)
        console.log(wallet)
        return wallet
        
    }
}