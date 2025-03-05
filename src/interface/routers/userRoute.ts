import { Router } from "express";
import  {getUser, updateBasics,updateAddress}  from "../controllers/userController";
const router = Router()

router.get("/getUser/:id", getUser)
router.patch("/update_basic_info", updateBasics)
router.patch("/update_address",updateAddress)

export default router