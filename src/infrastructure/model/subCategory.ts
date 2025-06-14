import mongoose, { ObjectId, Schema } from "mongoose";

interface ISubcategory {
    categoryId: ObjectId,
    subCategory: string,
    minDuration: number,
    maxDuration: number,
    

}
const subCategorySchema = new Schema<ISubcategory>({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required:true

    },
    subCategory: {
        type: String,
        required:true
    },
    minDuration: {
        type: Number,
        required:true,
        min:0.5
    },
    maxDuration: {
        type: Number,
        required:true,
        min: 0.5,
        validate: {
            validator: function(this:ISubcategory,value: number): boolean {
              return value >= this.minDuration;
            },
            message: 'Max duration must be greater than or equal to min duration'
          }
        
    }
})

export const subCategorymodel =  mongoose.model("SubCategory",subCategorySchema)