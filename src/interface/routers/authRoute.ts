import { Router } from "express";
import { userSignUp,Userlogin ,UserLogout,sendOTP,verifyOTP} from '../controllers/authController'
import { validateRequest } from "../../shared/utils/validateRequest";
import { signUpValidSchema } from "../../shared/validations/signUpValidSchema";
import { loginValidSchema } from "../../shared/validations/loginValidSchema";
// import { loginWithGoogle } from "../controllers/authController";

const router = Router()

router.post("/signup",validateRequest(signUpValidSchema) ,userSignUp)
router.post("/login", validateRequest(loginValidSchema), Userlogin)
router.post("/logout", UserLogout)
router.post("/sendMail", sendOTP)
router.post("/verifyOTP", verifyOTP)
// router.post("/login/google",loginWithGoogle)


export default router