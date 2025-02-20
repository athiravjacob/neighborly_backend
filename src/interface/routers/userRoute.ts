import { Router } from "express";
import { userSignUp,Userlogin ,UserLogout} from '../controllers/userController'
import { validateRequest } from "../../shared/utils/validateRequest";
import { signUpValidSchema } from "../../shared/validations/signUpValidSchema";
import { loginValidSchema } from "../../shared/validations/loginValidSchema";


const router = Router()

router.post("/signup",validateRequest(signUpValidSchema) ,userSignUp)
router.post("/login", validateRequest(loginValidSchema), Userlogin)
router.post("/logout",UserLogout)

export default router