
import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document{
    name: string;
    email: string;
    DOB?: Date;
    govtId: string;
    googleId: string;
    address?: {
        city: string;
        State: string;
        pincode:string
    }
    location?: {
        coordinates: number[]
    };
    profile_pic: string;
    bio: string;
    rating: Number;
    password: string;
    isVerified?: Boolean;
    phone: string;
    createdAt?: Date;
    updatedAt?:Date
    
}


const userSchema = new Schema<Iuser>({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    phone: {
        type: String,
        trim:true
    },
    DOB: {
        type:Date
    },
    govtId: {
        type:String
    },
    googleId: String,
    address: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true },
    },
    location: {
        coordinates: {
            type:[Number]
        },
    },
    profile_pic: String,
    bio: String,
    rating: {
        type: Number,
        default:0
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId
        }
    }
}, { timestamps: true })

const userModel = mongoose.model<Iuser>('User', userSchema)
export default userModel

