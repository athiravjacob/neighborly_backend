import { number } from "joi";
import { Schema, model } from "mongoose";

const walletSchema = new Schema({
    neighborId: { type: Schema.Types.ObjectId, ref: 'Neighbor', required: true },
    // escrowId: { type: Schema.Types.ObjectId, ref: 'Escrow', required: true },
    balance: { type: Number, default: 0 },
    withdrawableBalance:{type :Number,default :0}
}, {
    timestamps:true
})

export const  walletModel = model('Wallet',walletSchema)