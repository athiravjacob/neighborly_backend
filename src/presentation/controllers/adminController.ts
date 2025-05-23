import { Request,Response,NextFunction } from "express";
import { AdminFetchUsecase } from "../../application/usecases/admin/adminFetchUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { VerificationUsecase } from "../../application/usecases/admin/verificationUsecase";
import { BanUsecase } from "../../application/usecases/admin/banUsecase";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { Messages } from "../../shared/constants/messages";

export class AdminController{
    constructor(
        private adminUsecase:AdminFetchUsecase ,
        private verifyUsecase: VerificationUsecase,
        private banUsecase:BanUsecase
    ) { }
    fetchUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await this.adminUsecase.usersList()
            successResponse(res,HttpStatus.OK,Messages.SUCCESS.USER_LIST_SUCCESS,users)
        } catch (error) {
            next(error)
        }
    }

    fetchNeighbors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const neighbors = await this.adminUsecase.neighborsList()
            successResponse(res,HttpStatus.OK,Messages.SUCCESS.NEIGHBOR_LIST_SUCCESS,neighbors)
        } catch (error) {
            next(error)
        }
    }
    fetchTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tasks = await this.adminUsecase.tasksList()
            successResponse(res,HttpStatus.OK,Messages.SUCCESS.TASK_LIST_SUCCESS,tasks)
        } catch (error) {
            next(error)
        }
    }

    verifyNeighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { neighborId } = req.body
            console.log("hello verifyneighbor",neighborId)
            await this.verifyUsecase.verifyId(neighborId) 
            successResponse(res,HttpStatus.NO_CONTENT,Messages.SUCCESS.NEIGHBOR_VERIFY_SUCCESS)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    banUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
        await this.banUsecase.handleBan_user(id)

        successResponse(res,HttpStatus.NO_CONTENT,Messages.SUCCESS.USER_BAN_SUCCESS)

        } catch (error) {
            next(error)
        }
    }
    banNeighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
        await this.banUsecase.handleBan_neighbor(id)

        successResponse(res,HttpStatus.NO_CONTENT,Messages.SUCCESS.NEIGHBOR_BAN_SUCCESS)

        } catch (error) {
            next(error)
        }
    }

    // fetch_transactions = async(req:)

}