import { Router } from "express";
import { Routes } from "../../shared/constants/routes";
import verifyToken from "../middleware/authMiddleware";
import { Container } from "../../di/container";
import { DisputeController } from "../controllers/disputeController";

export default function setupDisputeRoutes(disputeController: DisputeController): Router{
    const router = Router()  
    router.post(Routes.DISPUTES.CREATE,verifyToken(['user','neighbor','admin'],Container.checkUserBanStatusUsecase),disputeController.raise_dispute)   
    router.get(Routes.DISPUTES.DISPUTE,verifyToken(['user','neighbor','admin'],Container.checkUserBanStatusUsecase),disputeController.fetch_dispute)
    return router
}