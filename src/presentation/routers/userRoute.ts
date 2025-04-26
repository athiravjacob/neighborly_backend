import { Router } from "express";
import { userController } from "../controllers/userController";
import verifyToken from "../middleware/authMiddleware";

export default function setupUserRoutes(userController: userController): Router{
    const router = Router()
    // router.get('/showTasks/:id', userController.showTasks)
    router.patch('/updateProfile',verifyToken(['user']), userController.updateProfile)
    router.get('/fetchProfile',verifyToken(['user']), userController.fetchProfile)
    

    return router
}












