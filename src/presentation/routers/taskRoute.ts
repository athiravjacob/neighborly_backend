import { Router } from "express";
import { TaskController } from "../controllers/taskController";

export default function setupTaskToutes(taskController: TaskController): Router{
    const router = Router()
    router.post('/create-task', taskController.createTask)
    router.get('/show-task', taskController.showTasks)
    // router.get('/taskDetails',taskController.taskDetails)
    

    return router
    
}