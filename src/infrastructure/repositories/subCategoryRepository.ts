import { json } from "express";
import { ISubcategoryRepository } from "../../domain/interface/repositories/ISubcategoryRepository";
import { subCategory } from "../../shared/types/category";
import { subCategorymodel } from "../model/subCategory";

export class subCategoryRepository implements ISubcategoryRepository{
    async getSubcategory(categoryId: string): Promise<subCategory[]> {
        const subCategory = await subCategorymodel.find({ categoryId:categoryId })
        console.log(subCategory)
        return JSON.parse(JSON.stringify(subCategory))
    }
}