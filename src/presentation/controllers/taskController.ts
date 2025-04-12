import {Request,Response, NextFunction } from "express";
import { successResponse } from "../../shared/utils/responseHandler";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";

export class TaskController{
    constructor(
        private taskUsecase:TaskUsecase
    ) { }
    
    createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { newTask } = req.body
            const task = await this.taskUsecase.createNewTask(newTask)
            successResponse(res,200,"New Task Created",task)
        } catch (error) {
            next(error)
        }
    }

    showTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const role = req.userType
            const id = req.userId
            if (role === 'user') {
                const data = await this.taskUsecase.showUserTasks(id!)
                successResponse(res,200,"Fetched tasks created by user",data)
            }
        } catch (error) {
            next(error)
        }
    }
}