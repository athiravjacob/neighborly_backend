import { Router } from "express";
import {  AuthController} from '../controllers/authController'
import { signUpValidSchema } from "../../shared/validations/signUpValidSchema";
import { validateRequest } from "../../shared/utils/validateRequest";
import { loginValidSchema } from "../../shared/validations/loginValidSchema";
import { auth } from "firebase-admin";

export default function setupAuthRoutes(authController: AuthController): Router {
  const router = Router();
    router.post('/signup', validateRequest(signUpValidSchema), authController.signup);
    router.post('/send-otp', authController.sendOTP);
    router.post('/verify-otp', authController.verifyOTP);
    router.post('/forgot-password',authController.forgotPassword)
    router.post('/reset-password',authController.resetPassword)
    router.post('/change-password',authController.changePassword)
    
    router.post('/login',validateRequest(loginValidSchema),authController.userlogin)
    router.post('/google-login',authController.googleLogin)
    router.post('/logout',authController.logout)
    router.post('/refresh',authController.refreshToken)
    
    
  
  // ****************************Neighbor**************************
    router.post('/neighbor/signup',authController.sigupNeighbor)
    router.post('/neighbor/login',authController.loginNeighbor)


    return router;
  }