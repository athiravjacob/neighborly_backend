import { ICategoryRepository } from "../../domain/interface/repositories/ICategoryRepository";
import { category } from "../../shared/types/category";
import { categoryModel } from "../model/categoryModel";

export class categoryRepository implements ICategoryRepository{
   async getAllCategory(): Promise<category[]> {
       const categories = await categoryModel.find()
       return JSON.parse(JSON.stringify(categories))
    }

}