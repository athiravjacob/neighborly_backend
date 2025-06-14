import { Router } from "express";
import { Routes } from "../../shared/constants/routes";

export default function setupCategoryRoutes(): Router{
    const router = Router()

    router
        .route(Routes.CATEGORY.BASE)
        .get()
    
    return router;
}