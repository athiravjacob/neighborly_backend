import { ICategoryRepository } from "../../../domain/interface/repositories/ICategoryRepository";
import { category, subCategory } from "../../../shared/types/category";
import {ISubcategoryRepository} from "../../../domain/interface/repositories/ISubcategoryRepository"

export class GetCategoriesUsecase{
    constructor(
        private categoryRepo: ICategoryRepository,
        private subCategoryRepo : ISubcategoryRepository
    ) { }
      
    async getcategory(): Promise<category[]>{
        return await this.categoryRepo.getAllCategory()
    }

    async getSubcategory(categoryId :string): Promise<subCategory[]>{
        return await this.subCategoryRepo.getSubcategory(categoryId)
    }




}