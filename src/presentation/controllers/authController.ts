import {Request,Response, NextFunction } from "express";
import { SignupUseCase } from "../../application/usecases/auth/Signup";
import {  successResponse } from "../../shared/utils/responseHandler";

export class AuthController{
  constructor(private SignupUsecase: SignupUseCase) { }
  
  async signup(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const { user } = req.body
      if (!user) {
        throw new Error('Missing required fields');
      }
      const newUser = await this.SignupUsecase.executeUser(user);
      successResponse(res, 201, 'User signup successful', newUser);
    } catch (error) {
       next(error)
    }
  }
}




































//************************************************************************************************************************************ */


// import { NextFunction, Request, Response } from "express";
// import { MongoUserRepository } from "../../infrastructure/repositories/userRepo";
// import { signUp } from "../../application/usecases/auth/signUp";
// import { login } from "../../application/usecases/auth/login"
// import {sendOTPtoUser} from '../../application/usecases/auth/sendOTPtoUser'
// import { successResponse } from "../../shared/utils/responseHandler";
// import { setRefreshTokenCookie, clearRefreshCookie } from "../utils/cookieHelper";
// import { verifyotp } from "../../application/usecases/auth/verifyotp"
// import { EmailServiceImpl } from "../../infrastructure/services/emailService-impl";
// import { RequestPasswordReset } from "../../application/usecases/auth/requestPassword-reset";
// import { ResetPassword } from "../../application/usecases/auth/resetPassword";
// // import { googleLogin } from "../../application/usecases/auth/login";

// const userRepository = new MongoUserRepository();
// const emailService = new EmailServiceImpl();
// const requestPasswordReset = new RequestPasswordReset(userRepository, emailService);
// const resetPassword = new ResetPassword(userRepository);


// export const userSignUp = async(req:Request, res:Response,next:NextFunction): Promise<void> => {
//     try {
//         const { name, email,phone, password } = req.body
//         const newUser = await signUp(name, email, phone, password, userRepository)
        
//      successResponse(res,200,"User SignUp successful",newUser)

//     } catch (error) {
//         next(error)

//     }
// }

// // User Login

// export const Userlogin = async (req: Request, res: Response,next:NextFunction):Promise<void> => {
//     try {
//         const { email, password } = req.body
//         const { accessToken, refreshToken, user } = await login(email, password, userRepository)
//         setRefreshTokenCookie(res,refreshToken)
//         successResponse(res,200,"Login Success",{accessToken,user})
//     } catch (error) {
//         next(error)
//     }
// }

// //Login With Google

// // export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// //     try {
// //         console.log("login with google", req.body)
// //         const { googleId } = req.body
// //         const { accessToken, refreshToken, user } = await googleLogin(googleId)
// //         successResponse(res,200,"Login Success",{accessToken,user})
// //     } catch (error) {
// //         next(error)
// //     }
// // }


// //Logout
// export const UserLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         clearRefreshCookie(res)
//         successResponse(res,200,"Logout Sucess")
//     } catch (error) {
//         next(error)
//     }
// }

// //Send Mail

// export const sendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {

//         const { email } = req.body
//         await sendOTPtoUser(email)
//         successResponse(res,200,"Otp send to user email")
//     } catch (error) {
//         next(error)
//     }
// }

// //Verify otp
// export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const { email, otp } = req.body
//         console.log(req.body)
//         await verifyotp(email,otp)
//         successResponse(res,200,"email verified")
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }


// export const requestPasswordResetController = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const { email } = req.body;
//       await requestPasswordReset.execute(email);
//       successResponse(res, 200, "If an account exists, a reset link has been sent");
//     } catch (error) {
//       next(error);
//     }
//   };
  
//   // Reset Password
//   export const resetPasswordController = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const { token, newPassword } = req.body;
//       console.log(newPassword)
//       await resetPassword.execute(token, newPassword);
//       successResponse(res, 200, "Password reset successfully");
//     } catch (error) {
//       next(error);
//     }
//   };