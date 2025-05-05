import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

export default function setupPaymentRoutes(paymentController: PaymentController): Router{
    const router = Router()
    router.post('/', paymentController.recordTransaction)
    
    return router
}