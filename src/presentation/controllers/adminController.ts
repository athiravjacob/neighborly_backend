import { Request,Response,NextFunction } from "express";
import { AdminFetchUsecase } from "../../application/usecases/admin/adminFetchUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { VerificationUsecase } from "../../application/usecases/admin/verificationUsecase";

export class AdminController{
    constructor(
        private adminUsecase:AdminFetchUsecase ,
        private verifyUsecase:VerificationUsecase
    ) { }
    fetchUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.adminUsecase.usersList()
            successResponse(res,200,'Availability updated successfully',users)
        } catch (error) {
            next(error)
        }
    }

    fetchNeighbors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const neighbors = await this.adminUsecase.neighborsList()
            successResponse(res,200,'Availability updated successfully',neighbors)
        } catch (error) {
            next(error)
        }
    }
    fetchTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tasks = await this.adminUsecase.tasksList()
            successResponse(res,200,'Availability updated successfully',tasks)
        } catch (error) {
            next(error)
        }
    }

    verifyNeighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { neighborId } = req.body
            console.log("hello verifyneighbor",neighborId)
            await this.verifyUsecase.verifyId(neighborId) 
            successResponse(res,200,'Neighbor ID verified')

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}