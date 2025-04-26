
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String },
  password: {
    type: String ,
    required: function (this: any) {
      return !this.googleId;
    },
    
  },
  dob:{type:String},
  profilePicture:{type:String},
  googleId: { type: String, required: false }, 
  resetToken: { type: String },
  resetTokenExpiresAt: { type: Number },
}, { timestamps: true });

export const UserModel = model('User', userSchema);