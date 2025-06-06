import { Router } from "express";
import { userController } from "../controllers/userController";
import verifyToken from "../middleware/authMiddleware";
import { Routes } from "../../shared/constants/routes";
import { Container } from "../../di/container";

export default function setupUserRoutes(userController: userController): Router{
    const router = Router()
    router.get(Routes.USERS.TASKS,verifyToken(['user'],Container.checkUserBanStatusUsecase), userController.fetchTasks)
    router.patch(Routes.USERS.UPDATE_PROFILE, verifyToken(['user'],Container.checkUserBanStatusUsecase),userController.updateProfile)
    router.get(Routes.USERS.PROFILE,verifyToken(['user','admin'],Container.checkUserBanStatusUsecase), userController.fetchProfile)

    return router
}
 











