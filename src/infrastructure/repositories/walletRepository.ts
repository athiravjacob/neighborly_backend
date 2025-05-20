import { Wallet } from "../../domain/entities/Wallet";
import { IWalletRepository } from "../../domain/interface/repositories/IWalletRepository";
import { WalletDetails } from "../../shared/types/Wallet";
import { walletModel } from "../model/walletModel";

export class WalletRepository implements IWalletRepository{
    async fetchWallet(neighborId: string): Promise<WalletDetails> {
        try {
            const wallet = await walletModel.findOne({ neighborId })
            console.log(wallet)
            if (!wallet) {
                return {
                    neighborId,
                    balance: 0,
                    withdrawableBalance: 0,
                    createdAt: undefined,
                    updatedAt: undefined,
                };
            }
            return JSON.parse(JSON.stringify(wallet))           

        } catch (error) {
            console.log(error)
            throw new Error("Error getting wallet details")

        }
    }


    async updateWalletBalance(neighborId: string, balance: number): Promise<void> {
        try {
            const wallet = await walletModel.findOne({ neighborId })
            if (wallet) {
                await walletModel.updateOne({ neighborId }, { $inc: { balance: balance } })
                return
            }
            await walletModel.create({neighborId,balance})

        } catch (error) {
            throw new Error("Error updating escrow account")
        }
    }

}