import { Request,Response,NextFunction } from "express";
import { adminFetchUsecase } from "../../application/usecases/admin/adminFetchUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { verificationUsecase } from "../../application/usecases/admin/VerificationUsecase";

export class AdminController{
    constructor(
        private adminUsecase: adminFetchUsecase,
        private verificationUsecase:verificationUsecase
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
            const {neighborId} = req.body
            await this.verificationUsecase.verifyId(neighborId) 
            successResponse(res,200,'Neighbor ID verified')

        } catch (error) {
            next(error)
        }
    }

}