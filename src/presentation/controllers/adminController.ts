import { Request,Response,NextFunction } from "express";
import { AdminFetchUsecase } from "../../application/usecases/admin/adminFetchUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { VerificationUsecase } from "../../application/usecases/admin/verificationUsecase";
import { BanUsecase } from "../../application/usecases/admin/banUsecase";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { Messages } from "../../shared/constants/messages";
import { AppError } from "../../shared/utils/errors";
import { DisputeUsecase } from "../../application/usecases/disputes/disputeUsecase";
import { saveTransaction } from "../../application/usecases/payment/saveTransactionUsecase";

export class AdminController{
    constructor(
        private adminUsecase:AdminFetchUsecase ,
        private verifyUsecase: VerificationUsecase,
        private banUsecase: BanUsecase,
        private disputeUsecase: DisputeUsecase,
        private transactionUsecase:saveTransaction,
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
            console.log("hello verify controller")
            const { neighborId } = req.params
            if(!neighborId) throw new AppError(HttpStatus.BAD_REQUEST,"Neighbor Id is missing")
            await this.verifyUsecase.verifyId(neighborId) 
            console.log("hey")
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

    fetch_disputes = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const disputes =await this.disputeUsecase.fetch_all_disputes()

        successResponse(res,HttpStatus.OK,"Dispute details fetched",disputes)

        } catch (error) {
            next(error)
        }
    }

    change_dispute = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { disputeId } = req.params
            const { status } = req.body
            console.log(disputeId,status)
        const disputes =await this.disputeUsecase.change_dispute_status(disputeId,status)

        successResponse(res,HttpStatus.OK,"Dispute status changed",disputes)

        } catch (error) {
            next(error)
        }
    }

    fetch_transactions = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const transactions =await this.transactionUsecase.transactionHistory()
        successResponse(res,HttpStatus.OK,"transaction history fetched",transactions)
        } catch (error) {
            next(error)
        }
    }

    total_revenue = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const revenue =await this.transactionUsecase.get_total_revenue()
        successResponse(res,HttpStatus.OK,"total revenue details for admin",revenue)
        } catch (error) {
            next(error)
        }
    }
}