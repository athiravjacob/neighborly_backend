import { Router } from "express";
import { userController } from "../controllers/userController";
import verifyToken from "../middleware/authMiddleware";
import { Routes } from "../../shared/constants/routes";

export default function setupUserRoutes(userController: userController): Router{
    const router = Router()
    router.get(Routes.USERS.TASKS, userController.fetchTasks)
    router.patch(Routes.USERS.UPDATE_PROFILE, userController.updateProfile)
    router.get(Routes.USERS.PROFILE, userController.fetchProfile)

    return router
}












