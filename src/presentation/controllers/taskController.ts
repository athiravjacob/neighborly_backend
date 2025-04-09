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
            successResponse(res,200,"New Task Created")
        } catch (error) {
            next(error)
        }
    }
}