import {Request,Response, NextFunction } from "express";
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
import { setAuthCookies } from "../utils/cookieHelper";
import admin from "../../infrastructure/firebase/firebaseAdmin";
import { ref } from "joi";
import { refreshTokenUsecase } from "../../application/usecases/auth/RefreshToken";
import { SignupUseCase } from "../../application/usecases/auth/signUp";

export class AuthController {
  constructor(
    private SignupUsecase: SignupUseCase,
    private SendOTPUsecase: SendOtpUsecase,
    private verifyOtpUseCase: verifyOtpUseCase,
    private forgotpassword: forgotPasswordUsecase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private loginUsecase: LoginUsecase,
    private logoutUsecase: LogoutUsecase,
    private refreshTokenUsecase: refreshTokenUsecase
    
  ) {}

  //******************************* Sign up ********************************* */
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

  // ************************** Send OTP ***********************
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
//************************************Verify OTP**************************************** */
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

  //*******************Forgot pasword send link to email ************* */
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
//**********************************  Resetting Password based on link******************/

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

  //****************************** Change Password of logged in user/neighbor ********************** */

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body
      const {id }= req.params
      const type = req.userType
      await this.resetPasswordUseCase.changeCurrentPassword(id,type!,currentPassword,newPassword)
      successResponse(res,200,'password changed successfully')

    } catch (error) {
      next(error)
    }
  }

  userlogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.body,"Hello user login")

    try {

      const dto: LoginDTO = req.body;
      const authResponse = await this.loginUsecase.executeUser(dto);
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);
      const user = { id: authResponse.id, name: authResponse.name, email: authResponse.email, type: authResponse.type };
      successResponse(res, 200, "Login Successful", user);
    } catch (error) {
      next(error);
    }
  };

  googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { idToken } = req.body;
      if (!idToken) throw new Error('Google idToken is required');
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const authResponse = await this.loginUsecase.loginWithGoogle(decodedToken.uid,decodedToken.email||"",decodedToken.name,decodedToken.phone_number||"");
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);
      const user = { id: authResponse.id, name: authResponse.name, email: authResponse.email, type: authResponse.type };
      console.log(user)
      successResponse(res, 200, "Google Login Successful", user);
    } catch (error) {
      console.log(error)
      next(error);
    }
  };

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

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken = req.cookies?.refresh_token
      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token is required' })
        return
      }
      const { new_accessToken, new_refreshToken } = await this.refreshTokenUsecase.execute(refreshToken)
      setAuthCookies(res, new_accessToken, new_refreshToken);

      successResponse(res,200,"refesh token ")
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
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);

      
      const neighbor ={ id: authResponse.id,
        name: authResponse.name,
        email: authResponse.email,
        type:authResponse.type}

      successResponse(res,200,"Login Successful",neighbor)
      
    } catch (error) {
      next(error)
    }
  }

  //***************************Admin************************* */
  adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto:LoginDTO = req.body
      const authResponse=await this.loginUsecase.executeAdmin(dto)
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);

      
      const admin ={ id: authResponse.id,
        name: authResponse.name,
        email: authResponse.email,
        type:authResponse.type}

      req.userId = "Admin01"
      req.userType="admin"
      successResponse(res,200,"Login Successful",admin)
      
    } catch (error) {
      next(error)
    }
  }
}

































