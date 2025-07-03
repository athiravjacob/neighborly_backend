import { number } from "joi";
import { Schema, model } from "mongoose";

const walletSchema = new Schema({
    role:{type:String, enum:["Admin","Neighbor","User"]},
    holder_id: { type: Schema.Types.ObjectId, refPath:"role", required: true },
    balance: { type: Number, default: 0 },
    withdrawableBalance:{type :Number,default :0}
}, {
    timestamps:true
})

export const  walletModel = model('Wallet',walletSchema)