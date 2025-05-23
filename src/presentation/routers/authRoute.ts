import { Router } from "express";
import {  AuthController} from '../controllers/authController'
import { signUpValidSchema } from "../../shared/validations/signUpValidSchema";
import { validateRequest } from "../../shared/utils/validateRequest";
import { loginValidSchema } from "../../shared/validations/loginValidSchema";
import { auth } from "firebase-admin";
import verifyToken from "../middleware/authMiddleware";
import { Routes } from "../../shared/constants/routes";

export default function setupAuthRoutes(authController: AuthController): Router {
  const router = Router();

  // User Registration & Login
  router
    .route(Routes.AUTH.USERS)
    .post(validateRequest(signUpValidSchema), authController.signup);

  router
    .route(Routes.AUTH.USER_LOGIN)
    .post(validateRequest(loginValidSchema), authController.userlogin);

  router
    .route(Routes.AUTH.USER_GOOGLE_LOGIN)
    .post(authController.googleLogin);

  // Logout & Token Refresh
  router
    .route(Routes.AUTH.USER_LOGOUT)
    .post(authController.logout);

  router
    .route(Routes.AUTH.TOKEN_REFRESH)
    .post(authController.refreshToken);

  // OTP & Password Management
  router
    .route(Routes.AUTH.USER_OTP_SEND)
    .post(authController.sendOTP);

  router
    .route(Routes.AUTH.USER_OTP_VERIFY)
    .post(authController.verifyOTP);

  router
    .route(Routes.AUTH.USER_PASSWORD_FORGOT)
    .post(authController.forgotPassword);

  router
    .route(Routes.AUTH.USER_PASSWORD_RESET)
    .post(authController.resetPassword);

  router
    .route(Routes.AUTH.USER_PASSWORD_CHANGE)
    .patch(verifyToken(['user', 'neighbor', 'admin']), authController.changePassword_user);

  // Neighbor Auth
  router
    .route(Routes.AUTH.NEIGHBORS)
    .post(authController.sigupNeighbor);

  router
    .route(Routes.AUTH.NEIGHBOR_LOGIN)
    .post(authController.loginNeighbor);

  router
    .route(Routes.AUTH.NEIGHBOR_PASSWORD_CHANGE)
    .post(authController.changePassword_neighbor);

  // Admin Auth
  router
    .route(Routes.AUTH.ADMIN_LOGIN)
    .post(authController.adminLogin);

  return router;
}



