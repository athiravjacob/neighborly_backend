import { Wallet } from "../../../domain/entities/Wallet";
import { IWalletRepository } from "../../../domain/interface/repositories/IWalletRepository";
import { WalletDetails } from "../../../shared/types/Wallet";

export class WalletUsecase{
    constructor(
        private walletRepository:IWalletRepository
    ) { }
    async add_wallet_balance(role:"Admin"|"Neighbor"|"User",holder_id:string,amount:number):Promise<void>
    {
        await this.walletRepository.updateWalletBalance(role,holder_id,amount)
}    
    async fetch_wallet(role:"Admin"|"Neighbor"|"User",holder_id:string): Promise<WalletDetails>{
        const wallet = await this.walletRepository.fetchWallet(role,holder_id)
        console.log(wallet)
        return wallet
        
    }
}