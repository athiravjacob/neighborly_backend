import { Router } from "express";
import {userSignUp} from '../controllers/userController'

const router = Router()

router.post("/signup", userSignUp)

export default router