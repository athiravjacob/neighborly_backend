import { WalletDetails } from "../../../shared/types/Wallet"
import { Wallet } from "../../entities/Wallet"

export interface IWalletRepository{
    updateWalletBalance(neighborId: string, balance: number): Promise<void>
    fetchWallet(neighborId:string) :Promise<WalletDetails>
}