import { Request,Response, NextFunction } from "express";
import { DisputeUsecase } from "../../application/usecases/disputes/disputeUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { AppError } from "../../shared/utils/errors";

export class DisputeController{
    constructor(
        private disputeUsecase : DisputeUsecase
    ) { }
    
    raise_dispute = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { disputeDetails } = req.body
            await this.disputeUsecase.raiseDispute(disputeDetails)
            successResponse(res,HttpStatus.OK,"Complaint registered ")

        } catch (error) {
            console.log(error)
         next(error)   
        }
    }

    fetch_dispute  = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { taskId } = req.query

            if (!taskId) throw new AppError(400, "taskId is required")
            if (typeof taskId !== 'string') {
                throw new AppError(400, 'taskId must be a string');
              }
            const disputeDetails =await this.disputeUsecase.fetchDispute(taskId)
            successResponse(res,HttpStatus.OK,"Complaint details fetched ",disputeDetails)

        } catch (error) {
            console.log(error)
         next(error)   
        }
    }

}