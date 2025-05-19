import { Router } from "express";
import { userController } from "../controllers/userController";
import verifyToken from "../middleware/authMiddleware";

export default function setupUserRoutes(userController: userController): Router{
    const router = Router()
    router.get('/:userId/tasks', userController.fetchTasks)
    router.patch('/:userId', userController.updateProfile)
    router.get('/:userId', userController.fetchProfile)

    return router
}












