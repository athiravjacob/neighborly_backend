import { Router } from "express";
import { Routes } from "../../shared/constants/routes";
import { CategoryController } from "../controllers/categoryController";

export default function setupCategoryRoutes(categoryController:CategoryController): Router{
    const router = Router()

    router
        .route(Routes.CATEGORY.CATEGORIES)
        .get(categoryController.fetchAllCategory)
    router
        .route(Routes.CATEGORY.SUB_CATEGORY)
        .get(categoryController.fetchSubcategories)
    
    return router;
}