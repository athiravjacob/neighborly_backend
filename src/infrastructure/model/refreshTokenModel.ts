import mongoose, { Schema } from "mongoose";

export interface RefreshToken {
    id: string; 
    token: string;
    expiresAt: Date;
    type: 'user' | 'neighbor' | 'admin';
  }
  
  const refreshTokenSchema = new Schema({
    id: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    type: { type: String, enum: ['user', 'neighbor', 'admin'], required: true },
  }, { timestamps: true });
  
  export default mongoose.model<RefreshToken>('RefreshToken', refreshTokenSchema);