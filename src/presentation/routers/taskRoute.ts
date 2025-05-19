import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import verifyToken from "../middleware/authMiddleware";

export default function setupTaskToutes(taskController: TaskController): Router{
    const router = Router()
    router.post('/',verifyToken(['user']), taskController.createTask)
    router.get('/:taskId/status', verifyToken(['neighbor', 'user', 'admin']), taskController.fetchStatus)
    router.patch('/:taskId/verify-code', verifyToken(['neighbor']), taskController.verifyTaskcode)
    router.patch('/:taskId/complete',verifyToken(['user']),taskController.markTaskComplete)
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