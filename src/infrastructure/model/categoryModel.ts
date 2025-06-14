import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    }
},{
        timestamps:true
    
})

export const categoryModel = mongoose.model("Category",categorySchema)