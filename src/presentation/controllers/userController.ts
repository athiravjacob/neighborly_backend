import { Request,Response,NextFunction } from "express";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { ProfileUsecase } from "../../application/usecases/user/ProfileUsecase";
import { WalletUsecase } from "../../application/usecases/payment/walletUsecase";

export class userController{
    constructor(
        private userProfile: ProfileUsecase,
        private taskUsecase:TaskUsecase

    ){}
    

    //*****************Update User Profile************** */
    updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { profileDetails } = req.body
            const id = req.params.userId
            const data = await this.userProfile.updateProfileInfo(id!,profileDetails)
            successResponse(res,200,'user profile updated',data)
        } catch (error) {
           next(error) 
        }
        
    }

    fetchProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.userId
            const data = await this.userProfile.fetchProfileInfo(id!)
            successResponse(res,200,'user profile fetched',data)

        } catch (error) {
            next(error) 

        }
    }

    // ******************Fetch Tasks created by user************

    fetchTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.params
            const data = await this.taskUsecase.showUserTasks(userId!)
            successResponse(res,200,"Fetched tasks created by user",data)
        } 
        catch (error) {
            next(error)
        }
    }



   
}