import { Schema, model } from "mongoose";

const adminSchema = new Schema({
    name: String,
    email: String,
    password:String
})

export const adminModel = model('Admin',adminSchema)