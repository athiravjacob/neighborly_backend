import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import verifyToken from "../middleware/authMiddleware";

export default function setupTaskToutes(taskController: TaskController): Router{
    const router = Router()
    router.post('/create-task',verifyToken(['user']), taskController.createTask)
    router.get('/show-task/:id',verifyToken(['neighbor','user']), taskController.showTasks)
    // router.get('/taskDetails',taskController.taskDetails)
    

    return router
    
}