import { Router } from "express";
import {  AuthController} from '../controllers/authController'
import { signUpValidSchema } from "../../shared/validations/signUpValidSchema";
import { validateRequest } from "../../shared/utils/validateRequest";
import { loginValidSchema } from "../../shared/validations/loginValidSchema";
import { auth } from "firebase-admin";
import verifyToken from "../middleware/authMiddleware";

export default function setupAuthRoutes(authController: AuthController): Router {
  const router = Router();

  // User Registration & Login
  router.post('/users', validateRequest(signUpValidSchema), authController.signup); 
  router.post('/users/login', validateRequest(loginValidSchema), authController.userlogin);
  router.post('/users/google-login',authController.googleLogin)
  router.post('/users/logout', authController.logout); 

  // OTP Verification (as a sub-resource of users)
  router.post('/users/otp/send', authController.sendOTP); 
  router.post('/users/otp/verify', authController.verifyOTP);

  // Password management (for current authenticated user)
  router.post('/users/password/forgot', authController.forgotPassword);
  router.post('/users/password/reset', authController.resetPassword);
  router.patch('/users/:id/password/change', verifyToken(['user', 'neighbor', 'admin']), authController.changePassword_user);

  // Token refresh
  router.post('/tokens/refresh', authController.refreshToken);

  // Neighbor user routes
  router.post('/neighbors', authController.sigupNeighbor); 
  router.post('/neighbors/login', authController.loginNeighbor); 
  router.post('/neighbors/:neighborId/password/change',authController.changePassword_neighbor)

  // Admin routes
  router.post('/admins/login', authController.adminLogin); 

  return router;
}


