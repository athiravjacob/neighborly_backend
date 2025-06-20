import { subCategory } from "../../../shared/types/category";

export interface ISubcategoryRepository{
    getSubcategory(categoryId:string):Promise<subCategory[]>
}