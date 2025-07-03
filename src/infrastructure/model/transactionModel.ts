import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    neighborId: { type: Schema.Types.ObjectId, ref: 'Neighbor', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', 'required': true },
    stripeTransactionId: { type: String, required: true },
    base_amount: { type: Number, required: true },
    platform_fee: { type: Number, required: true },
    total_amount: { type: Number, required: true },
}, {
    timestamps:true
}
)

export const transactionModel = model('Transaction',transactionSchema)