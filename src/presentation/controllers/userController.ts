import { NextFunction } from "express";
import { TaskDetails } from "../../shared/types/TaskDetailsDTO";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";

export class userController{
    constructor(
        taskUsecase:TaskUsecase
    ) { }
    
    //*****************************List tasks created by users
    showTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id
            const data = await this.taskuseCase.showUserTasks(id)
        } catch (error) {
            
        }
    }
}