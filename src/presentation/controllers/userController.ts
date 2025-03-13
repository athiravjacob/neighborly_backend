import {Request,Response, NextFunction, RequestHandler } from "express";
import { successResponse } from "../../shared/utils/responseHandler";
import { getUserDetails } from "../../application/usecases/user/getUserDetails";
import { MongoUserRepository } from "../../infrastructure/repositories/userRepository";
import { updateBasicInfo } from "../../application/usecases/user/updateBasicInfo";
import { updateuserAddress } from "../../application/usecases/user/updateAddress";
const userRepository = new MongoUserRepository()

export const getUser: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserDetails(id,userRepository);

        successResponse(res, 200, "User Detail Fetched", user);
    } catch (error) {
        next(error);
    }
};


export const updateBasics = async(req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
        const userDetails = req.body.userBasicInfo
        const user = await updateBasicInfo(userDetails, userRepository)
        successResponse(res, 200, "User updated", user);

    } catch (error) {
        next(error)
    }
}

export const updateAddress = async(req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
        const {id,address} = req.body
         
        const user = await updateuserAddress(id,address, userRepository)
        successResponse(res, 200, "User updated", user);

    } catch (error) {
        next(error)
    }
}