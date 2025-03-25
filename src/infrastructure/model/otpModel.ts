import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
}

const otpSchema = new Schema<IOtp>({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
}, {
    timestamps: true 
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const otpModel = mongoose.model<IOtp>('Otp', otpSchema);
export default otpModel;