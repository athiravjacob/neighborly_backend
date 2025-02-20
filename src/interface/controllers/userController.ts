import { NextFunction, Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/database/userRepository";
import { signUp } from "../../application/usecases/user/signUp";
import {login} from "../../application/usecases/user/login"
import { successResponse } from "../../shared/utils/responseHandler";
import { setRefreshTokenCookie,clearRefreshCookie } from "../utils/cookieHelper";
const userRepository = new MongoUserRepository()
// User Signup
export const userSignUp = async(req:Request, res:Response,next:NextFunction): Promise<void> => {
    try {
        const { name, email,phone, password } = req.body
        const newUser = await signUp(name, email, phone, password, userRepository)
        
     successResponse(res,200,"User SignUp successful",newUser)

    } catch (error) {
        next(error)

    }
}

// User Login

export const Userlogin = async (req: Request, res: Response,next:NextFunction):Promise<void> => {
    try {
        const { email, password } = req.body
        const { accessToken, refreshToken, user } = await login(email, password, userRepository)
        setRefreshTokenCookie(res,refreshToken)
        successResponse(res,200,"Login Success",{accessToken,user})
    } catch (error) {
        next(error)
    }
}

export const UserLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        clearRefreshCookie(res)
        successResponse(res,200,"Logout Sucess",null)
    } catch (error) {
        next(error)
    }
}