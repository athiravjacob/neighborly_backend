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
            console.log(newTask )
            const task = await this.taskUsecase.createNewTask(newTask)
            console.log(task)
            successResponse(res,200,"New Task Created",task)
        } catch (error) {
            next(error)
        }
    }

    

    
    fetchStatus =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { taskID } = req.params
            const status = await this.taskUsecase.fetctTaskStatus(taskID)
            successResponse(res,200,"fetched task status",status)

        } catch (error) {
            next(error)
        }
    }

    verifyTaskcode =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {taskId} = req.params
            const { neighborId,code } = req.body
            await this.taskUsecase.verifyTaskcode(taskId,neighborId, code )
            successResponse(res,200,"task code verified and task mark as in progress",)

        } catch (error) {
            next(error)
        }
    }

    markTaskComplete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { taskId } = req.params
            await this.taskUsecase.taskCompleted(taskId )
            successResponse(res,200,"Task completed succesfully.",)

        } catch (error) {
            next(error)
        }
    }
     // **********************Accept Task *******************

     markTaskAccepted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { taskId } = req.params
            const {taskAcceptDetails,neighborId} = req.body
            await this.taskUsecase.acceptTask(taskId,neighborId,taskAcceptDetails)
            console.log("accpt task ",taskId)
            successResponse(res,200,"Neighbor accepted the task")

        } catch (error) {
            next(error)
        }
    }
}