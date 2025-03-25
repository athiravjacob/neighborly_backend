import {Request,Response, NextFunction } from "express";
import { SignupUseCase } from "../../application/usecases/auth/Signup";
import {  successResponse } from "../../shared/utils/responseHandler";
import { AppError } from "../../shared/utils/errors";
import { SendOtpUsecase } from "../../application/usecases/auth/SendOTP-email";
import { verifyOtpUseCase } from "../../application/usecases/auth/VerifyOTP";
import { forgotPasswordUsecase } from "../../application/usecases/auth/ForgotPassword";
import { ResetPasswordUseCase } from "../../application/usecases/auth/ResetPassword";
import { LoginUsecase } from "../../application/usecases/auth/Login";
import { LoginDTO } from "../../shared/types/LoginDTO";
import { LogoutUsecase } from "../../application/usecases/auth/Logout";
import { Neighbor } from "../../domain/entities/Neighbor";

export class AuthController {
  constructor(
    private SignupUsecase: SignupUseCase,
    private SendOTPUsecase: SendOtpUsecase,
    private verifyOtpUseCase: verifyOtpUseCase,
    private forgotpassword: forgotPasswordUsecase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private loginUsecase: LoginUsecase,
    private logoutUsecase:LogoutUsecase
  ) {}

  signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = req.body;
      if (!user) {
        throw new AppError(400, 'Missing required fields');
      }
      const newUser = await this.SignupUsecase.executeUser(user);
      successResponse(res, 201, 'User signup successful', newUser);
    } catch (error) {
      next(error);
    }
  };

  sendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) throw new AppError(400, 'email required');
      await this.SendOTPUsecase.execute(email);
      successResponse(res, 200, 'OTP sent to given email');
    } catch (error) {
      next(error);
    }
  };

  verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { otp, email } = req.body
      if (!otp || !email) {
        throw new AppError(400,"email and otp required")
      }
      await this.verifyOtpUseCase.execute(email, otp);
      successResponse(res, 200, 'OTP verified successfully');

    } catch (error) {
      next(error);
    }
  };

  forgotPassword =async(req:Request,res:Response,next:NextFunction):Promise<void>=> {
    try {
      const { email } = req.body
      if (!email) throw new AppError(400, "email required")
      
      await this.forgotpassword.execute(email)
      successResponse(res,200,'password reset link send to the mail')
    } catch (error) {
      next(error)
    }
  }


  resetPassword=async (req:Request,res:Response,next:NextFunction):Promise<void>=> {
    try {
      const { email, token, newPassword } = req.body
      if (!email || !token || !newPassword) throw new AppError(400, "email,token and new password are required")
      await this.resetPasswordUseCase.execute(email, token, newPassword)
      successResponse(res,200,'password reset successful.Please Login')

    } catch (error) {
      next(error)
    }
  }


  userlogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto:LoginDTO = req.body
      const authResponse=await this.loginUsecase.executeUser(dto)

      res.cookie('access_token', authResponse.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000, 
      });

      res.cookie('refresh_token', authResponse.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
      
      const user ={ id: authResponse.id,
        name: authResponse.name,
        email: authResponse.email,
        type:authResponse.type}

      successResponse(res,200,"Login Successful",user)
    } catch (error) {
       next(error)
    }
    
  }

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      const refreshToken = req.cookies['refresh_token'];
      if (refreshToken) {
        await this.logoutUsecase.execute(refreshToken)
      }
      
      successResponse(res, 200, 'logged out');
    } catch (error) {
      next(error)
    }
  }

  //****************************************  Neighbor ************************/


  sigupNeighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { neighbor } = req.body
      const newNeighbor = await this.SignupUsecase.executeNeighbor(neighbor);
      successResponse(res, 201, 'User signup successful', newNeighbor);
    } catch (error) {
      next(error)
    }
    
  }

  loginNeighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto:LoginDTO = req.body
      const authResponse=await this.loginUsecase.executeNeighbor(dto)

      res.cookie('access_token', authResponse.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000, 
      });

      res.cookie('refresh_token', authResponse.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
      
      const neighbor ={ id: authResponse.id,
        name: authResponse.name,
        email: authResponse.email,
        type:authResponse.type}

      successResponse(res,200,"Login Successful",neighbor)
      
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