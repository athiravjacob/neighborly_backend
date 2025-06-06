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
    router.patch(Routes.TASKS.ACCEPT,verifyToken(['neighbor'],Container.checkUserBanStatusUsecase),taskController.markTaskAccepted)

    return router
    
}
// export default function setupTaskToutes(taskController: TaskController): Router{
//     const router = Router()
//     router.post('/create-task',verifyToken(['user']), taskController.createTask)
//     router.get('/show-task/:id',verifyToken(['neighbor','user']), taskController.showTasks)
//     router.patch('/accept-task',verifyToken(['neighbor']),taskController.acceptTask)    
//     router.get('/fetch-taskStatus/:id', verifyToken(['neighbor', 'user', 'admin']), taskController.fetchStatus)
//     router.patch('/verify_task_code', verifyToken(['neighbor']), taskController.verifyTaskcode)
//     router.patch('/mark_task_complete',verifyToken(['user']),taskController.markTaskComplete)
//     return router
    
// }