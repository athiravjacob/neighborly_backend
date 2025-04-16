import { Request,Response,NextFunction } from "express";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";
import { successResponse } from "../../shared/utils/responseHandler";
import { ProfileUsecase } from "../../application/usecases/user/ProfileUsecase";

export class userController{
    constructor(
        private userProfile:ProfileUsecase
    ){}
    

    //*****************Update User Profile************** */
    updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { profileDetails } = req.body
            const id = req.userId
            const data = await this.userProfile.updateProfileInfo(id!,profileDetails)
            successResponse(res,200,'user profile updated',data)
        } catch (error) {
           next(error) 
        }
        
    }

    fetchProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.userId
            const data = await this.userProfile.fetchProfileInfo(id!)
        } catch (error) {
            
        }
    }



   
}