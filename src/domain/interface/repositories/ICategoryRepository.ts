import { category } from "../../../shared/types/category";

export interface ICategoryRepository{
    getAllCategory():Promise<category[]>
}