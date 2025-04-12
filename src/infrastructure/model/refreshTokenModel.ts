import mongoose, { Schema } from "mongoose";
import { RefreshToken } from "../../shared/types/AuthResponseDTO";


  const refreshTokenSchema = new Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    type: { type: String, enum: ['user', 'neighbor', 'admin'], required: true },
  }, { timestamps: true });
  
  export default mongoose.model<RefreshToken>('RefreshToken', refreshTokenSchema);