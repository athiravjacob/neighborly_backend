import { Router } from "express";
import { userController } from "../controllers/userController";

export default function setupUserRoutes(userController: userController): Router{
    const router = Router()
    router.post('/showTasks/:id', userController.showTasks)
    return router
}















// import { Router } from "express";
// import  {getUser, updateBasics,updateAddress, verifyGovtIdController}  from "../controllers/userController";
// import authMiddleware from "../middleware/authMiddleware";
// const router = Router()

// router.get("/getUser/:id",authMiddleware, getUser)
// router.patch("/update_basic_info",authMiddleware, updateBasics)
// router.patch("/update_address", authMiddleware, updateAddress)
// router.post("/verify_govt_id",authMiddleware,verifyGovtIdController)

// export default router