import { Request,Response,NextFunction } from "express";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";
import { errorResponse, successResponse } from "../../shared/utils/responseHandler";
import { ProfileUsecase } from "../../application/usecases/user/ProfileUsecase";
import { WalletUsecase } from "../../application/usecases/payment/walletUsecase";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { Messages } from "../../shared/constants/messages";

export class userController{
    constructor(
        private userProfile: ProfileUsecase,
        private taskUsecase:TaskUsecase

    ){}
    

    updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const { profileDetails } = req.body;
          const { userId } = req.params;
          if (!userId) {
            errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.INVALID_USER_ID);
            return;
          }
          const data = await this.userProfile.updateProfileInfo(userId, profileDetails);
          successResponse(res, HttpStatus.OK, Messages.SUCCESS.USER_PROFILE_UPDATED, data);
        } catch (error) {
          next(error);
        }
      };
    
      fetchProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const { userId } = req.params;
          if (!userId) {
            errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.INVALID_USER_ID);
            return;
          }
          const data = await this.userProfile.fetchProfileInfo(userId);
          successResponse(res, HttpStatus.OK, Messages.SUCCESS.USER_PROFILE_FETCHED, data);
        } catch (error) {
          next(error);
        }
      };
    
      fetchTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const { userId } = req.params;
          if (!userId) {
            errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.INVALID_USER_ID);
            return;
          }
          const data = await this.taskUsecase.showUserTasks(userId);
          successResponse(res, HttpStatus.OK, Messages.SUCCESS.USER_TASKS_FETCHED, data);
        } catch (error) {
          next(error);
        }
      };



   
}