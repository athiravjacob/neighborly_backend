import { Request,Response, NextFunction } from "express";
import { GetCategoriesUsecase } from "../../application/usecases/category/getCategoriesUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { HttpStatus } from "../../shared/constants/httpStatus";

export class CategoryController{
    constructor(
        private categoryUsecase :GetCategoriesUsecase
    ) { }
    
    fetchAllCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const categories = await this.categoryUsecase.getcategory()
            successResponse(res,HttpStatus.OK,"fetched all categories",categories)
        } catch (error) {
            next(error)
        }
    }

    fetchSubcategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {categoryId} = req.params
            const subCategory = await this.categoryUsecase.getSubcategory(categoryId)
            console.log(categoryId)
            console.log(subCategory)
            successResponse(res,HttpStatus.OK,"fetched all subcategories",subCategory)
        } catch (error) {
            next(error)
        }
    }
}