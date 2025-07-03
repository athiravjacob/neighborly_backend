import { WalletDetails } from "../../../shared/types/Wallet"
import { Wallet } from "../../entities/Wallet"

export interface IWalletRepository{
    updateWalletBalance(role:"Neighbor"|"User"|"Admin",holder_id: string, balance: number): Promise<void>
    fetchWallet(role:"Neighbor"|"User"|"Admin",holder_id: string) :Promise<WalletDetails>
}