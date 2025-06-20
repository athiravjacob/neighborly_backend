import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import verifyToken from "../middleware/authMiddleware";
import { Routes } from "../../shared/constants/routes";
import { Container } from "../../di/container";

export default function setupTaskToutes(taskController: TaskController): Router{
    const router = Router()
    router.post(Routes.TASKS.CREATE,verifyToken(['user'],Container.checkUserBanStatusUsecase), taskController.createTask)
    router.get(Routes.TASKS.STATUS, verifyToken(['neighbor', 'user', 'admin'],Container.checkUserBanStatusUsecase), taskController.fetchStatus)
    router.patch(Routes.TASKS.VERIFY_CODE, verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), taskController.verifyTaskcode)
    router.patch(Routes.TASKS.COMPLETE, verifyToken(['user'],Container.checkUserBanStatusUsecase), taskController.markTaskComplete)
    router.patch(Routes.TASKS.ACCEPT, taskController.markTaskAccepted)
    router.get('/:taskId/neighbors/:neighborId/arrival-time',taskController.getArraivalTime)
    
    return router
    
}
