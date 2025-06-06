import {Request,Response, NextFunction } from "express";
import {  errorResponse, successResponse } from "../../shared/utils/responseHandler";
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
import { HttpStatus } from "../../shared/constants/httpStatus";
import { Messages } from "../../shared/constants/messages";

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

  signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = req.body;
      if (!user) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      const newUser = await this.SignupUsecase.executeUser(user);
      successResponse(res, HttpStatus.CREATED, Messages.SUCCESS.USER_SIGNUP_SUCCESS, newUser);
    } catch (error) {
      next(error);
    }
  };

  sendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      await this.SendOTPUsecase.execute(email);
      successResponse(res, HttpStatus.NO_CONTENT, Messages.SUCCESS.OTP_SENT_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { otp, email } = req.body;
      if (!otp || !email) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      await this.verifyOtpUseCase.execute(email, otp);
      successResponse(res, HttpStatus.NO_CONTENT, Messages.SUCCESS.OTP_VERIFIED_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      if (!email) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      await this.forgotpassword.execute(email);
      successResponse(res, HttpStatus.NO_CONTENT, Messages.SUCCESS.PASSWORD_RESET_LINK_SENT);
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, token, newPassword } = req.body;
      if (!email || !token || !newPassword) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      await this.resetPasswordUseCase.execute(email, token, newPassword);
      successResponse(res, HttpStatus.NO_CONTENT, Messages.SUCCESS.PASSWORD_RESET_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  changePassword_user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;
      const id = req.params.userId;
      if (!id || !currentPassword || !newPassword) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      await this.resetPasswordUseCase.changeCurrentPassword(id, 'user', currentPassword, newPassword);
      successResponse(res, HttpStatus.NO_CONTENT, Messages.SUCCESS.PASSWORD_CHANGED_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  changePassword_neighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { currentPassword, newPassword } = req.body;
      const id = req.params.neighborId;
      if (!id || !currentPassword || !newPassword) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      await this.resetPasswordUseCase.changeCurrentPassword(id, 'neighbor', currentPassword, newPassword);
      successResponse(res, HttpStatus.NO_CONTENT, Messages.SUCCESS.PASSWORD_CHANGED_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  userlogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: LoginDTO = req.body;
      const authResponse = await this.loginUsecase.executeUser(dto);
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);
      const user = { id: authResponse.id, name: authResponse.name, email: authResponse.email, type: authResponse.type };
      successResponse(res, HttpStatus.OK, Messages.SUCCESS.LOGIN_SUCCESS, user);
    } catch (error) {
      next(error);
    }
  };

  googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const authResponse = await this.loginUsecase.loginWithGoogle(
        decodedToken.uid,
        decodedToken.email || '',
        decodedToken.name,
        decodedToken.phone_number || ''
      );
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);
      const user = { id: authResponse.id, name: authResponse.name, email: authResponse.email, type: authResponse.type };
      successResponse(res, HttpStatus.OK, Messages.SUCCESS.GOOGLE_LOGIN_SUCCESS, user);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      const refreshToken = req.cookies['refresh_token'];
      if (refreshToken) {
        await this.logoutUsecase.execute(refreshToken);
      }
      successResponse(res, HttpStatus.NO_CONTENT, Messages.SUCCESS.LOGOUT_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log("refresh")
      const refreshToken = req.cookies?.refresh_token;
      if (!refreshToken) {
        console.log("no token")
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      const { new_accessToken, new_refreshToken } = await this.refreshTokenUsecase.execute(refreshToken);
      setAuthCookies(res, new_accessToken, new_refreshToken);
      successResponse(res, HttpStatus.OK, Messages.SUCCESS.TOKEN_REFRESH_SUCCESS);
    } catch (error) {
      next(error);
    }
  };

  signupNeighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { neighbor } = req.body;
      if (!neighbor) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }
      const newNeighbor = await this.SignupUsecase.executeNeighbor(neighbor);
      successResponse(res, HttpStatus.CREATED, Messages.SUCCESS.NEIGHBOR_SIGNUP_SUCCESS, newNeighbor);
    } catch (error) {
      next(error);
    }
  };

  loginNeighbor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: LoginDTO = req.body;
      const authResponse = await this.loginUsecase.executeNeighbor(dto);
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);
      const neighbor = {
        id: authResponse.id,
        name: authResponse.name,
        email: authResponse.email,
        type: authResponse.type,
      };
      successResponse(res, HttpStatus.OK, Messages.SUCCESS.LOGIN_SUCCESS, neighbor);
    } catch (error) {
      next(error);
    }
  };

  adminLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const {email,password}= req.body;
      if(!email || !password) errorResponse(res,HttpStatus.BAD_REQUEST,Messages.ERROR.MISSING_FIELDS)
      const authResponse = await this.loginUsecase.executeAdmin({email,password});
      setAuthCookies(res, authResponse.accessToken, authResponse.refreshToken);
      const admin = {
        id: authResponse.id,
        name: authResponse.name,
        email: authResponse.email,
        type: authResponse.type,
      };
      successResponse(res, HttpStatus.OK, Messages.SUCCESS.ADMIN_LOGIN_SUCCESS, admin);
    } catch (error) {
      next(error);
    }
  };
}

































