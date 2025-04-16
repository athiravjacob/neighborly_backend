import { Router } from "express";
import { userController } from "../controllers/userController";

export default function setupUserRoutes(userController: userController): Router{
    const router = Router()
    // router.get('/showTasks/:id', userController.showTasks)
    router.patch('/updateProfile', userController.updateProfile)
    router.get('/fetchProfile', userController.fetchProfile)
    

    return router
}












