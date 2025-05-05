import { Schema, model } from "mongoose";

const escrowSchema = new Schema({
    transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true },
    neighborId: { type: Schema.Types.ObjectId, ref: 'Neighbor', required: true },
    admin_Approval: { type:String,enum:["pending", "approved", "rejected"], default: "pending" },
    transferStatus: { type: String, enum: ["pending", "transfered", "dispute"] },
    transferedDate:Date
}, { timestamps: true })

export const escrowModel = model('Escrow',escrowSchema)