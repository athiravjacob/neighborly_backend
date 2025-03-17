import { Router } from "express";
import {  AuthController} from '../controllers/authController'
import { signUpValidSchema } from "../../shared/validations/signUpValidSchema";
import { validateRequest } from "../../shared/utils/validateRequest";

export default function setupAuthRoutes(authController: AuthController): Router {
    const router = Router();
    router.post('/signup',validateRequest(signUpValidSchema), authController.signup.bind(authController))
    return router;
  }