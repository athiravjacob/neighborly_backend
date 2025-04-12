import { Request,Response,NextFunction } from "express";
import { TaskDetails } from "../../shared/types/TaskDetailsDTO";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";
import { successResponse } from "../../shared/utils/responseHandler";

export class userController{
    constructor(
        private taskUsecase:TaskUsecase
    ){}
    //*****************************List tasks created by users***************************
    showTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id
            const data = await this.taskUsecase.showUserTasks(id)
            successResponse(res,200,"Fetched tasks created by user",data)
        } catch (error) {
            next(error)
        }
    }


   
}