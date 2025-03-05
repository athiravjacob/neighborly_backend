import { NextFunction, Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/database/repositories/userRepository";
import { signUp } from "../../application/usecases/auth/signUp";
import { login } from "../../application/usecases/auth/login"
import {sendOTPtoUser} from '../../application/usecases/auth/sendOTPtoUser'
import { successResponse } from "../../shared/utils/responseHandler";
import { setRefreshTokenCookie, clearRefreshCookie } from "../utils/cookieHelper";
import { verifyotp } from "../../application/usecases/auth/verifyotp"
// import { googleLogin } from "../../application/usecases/auth/login";
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

//Login With Google

// export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         console.log("login with google", req.body)
//         const { googleId } = req.body
//         const { accessToken, refreshToken, user } = await googleLogin(googleId)
//         successResponse(res,200,"Login Success",{accessToken,user})
//     } catch (error) {
//         next(error)
//     }
// }


//Logout
export const UserLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        clearRefreshCookie(res)
        successResponse(res,200,"Logout Sucess")
    } catch (error) {
        next(error)
    }
}

//Send Mail

export const sendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { email } = req.body
        await sendOTPtoUser(email)
        successResponse(res,200,"Otp send to user email")
    } catch (error) {
        next(error)
    }
}

//Verify otp
export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, otp } = req.body
        console.log(req.body)
        await verifyotp(email,otp)
        successResponse(res,200,"email verified")
    } catch (error) {
        console.log(error)
        next(error)
    }
}


