
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true },
  password: { type: String,required:true }, 
}, { timestamps: true });

export const UserModel = model('User', userSchema);
