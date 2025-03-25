
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, 
  // otp: { type: String },                
  // otpExpiresAt: { type: Number },
  resetToken: { type: String },         
  resetTokenExpiresAt: { type: Number }
}, { timestamps: true });

export const UserModel = model('User', userSchema);
