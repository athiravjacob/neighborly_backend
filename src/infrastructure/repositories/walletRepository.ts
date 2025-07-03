import { Wallet } from "../../domain/entities/Wallet";
import { IWalletRepository } from "../../domain/interface/repositories/IWalletRepository";
import { WalletDetails } from "../../shared/types/Wallet";
import { walletModel } from "../model/walletModel";

export class WalletRepository implements IWalletRepository{
    async fetchWallet(role:"Neighbor"|"User"|"Admin",holder_id: string): Promise<WalletDetails> {
        try {
            const wallet = await walletModel.findOne({ role,holder_id })
            console.log(wallet)
            if (!wallet) {
                return {
                    role,
                    holder_id,
                    balance: 0,
                    withdrawableBalance: 0,
                   
                };
            }
            return JSON.parse(JSON.stringify(wallet))           

        } catch (error) {
            console.log(error)
            throw new Error("Error getting wallet details")

        }
    }


    async updateWalletBalance(role:"Neighbor"|"User"|"Admin",holder_id: string, balance: number): Promise<void> {
        try {
            const wallet = await walletModel.findOne({ role,holder_id })
            if (wallet) {
                await walletModel.updateOne({ holder_id }, { $inc: { balance: balance } })
                return
            }
            await walletModel.create({role,holder_id,balance})

        } catch (error) {
            throw new Error("Error updating escrow account")
        }
    }

}