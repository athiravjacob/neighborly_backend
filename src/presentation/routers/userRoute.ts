import { Router } from "express";
import  {getUser, updateBasics,updateAddress}  from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router()

router.get("/getUser/:id",authMiddleware, getUser)
router.patch("/update_basic_info",authMiddleware, updateBasics)
router.patch("/update_address",authMiddleware,updateAddress)

export default router