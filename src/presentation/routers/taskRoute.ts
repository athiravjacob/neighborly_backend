import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import verifyToken from "../middleware/authMiddleware";
import { Routes } from "../../shared/constants/routes";

export default function setupTaskToutes(taskController: TaskController): Router{
    const router = Router()
    router.post(Routes.TASKS.CREATE,verifyToken(['user']), taskController.createTask)
    router.get(Routes.TASKS.STATUS, verifyToken(['neighbor', 'user', 'admin']), taskController.fetchStatus)
    router.patch(Routes.TASKS.VERIFY_CODE, verifyToken(['neighbor']), taskController.verifyTaskcode)
    router.patch(Routes.TASKS.COMPLETE, verifyToken(['user']), taskController.markTaskComplete)
    router.patch(Routes.TASKS.ACCEPT,verifyToken(['neighbor']),taskController.markTaskAccepted)

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