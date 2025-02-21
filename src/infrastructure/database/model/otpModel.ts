import mongoose, { Schema, Document } from "mongoose";

export interface Iotp extends Document{
    email: string;
    otp: string;
    expiresAt:Date
}

const otpSchema = new Schema<Iotp>({
    email: String,
    otp: String,
    expiresAt:Date
})
otpSchema.index({expiresAt:1},{expireAfterSeconds:0})
const otpModel = mongoose.model<Iotp>('Otp', otpSchema)
export default otpModel