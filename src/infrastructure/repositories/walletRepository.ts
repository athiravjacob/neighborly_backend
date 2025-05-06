import { IWalletRepository } from "../../domain/interface/repositories/IWalletRepository";
import { walletModel } from "../model/walletModel";

export class WalletRepository implements IWalletRepository{
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