import express, { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
export default function setupPaymentRoutes(paymentController: PaymentController): Router{
    const router = Router()
    router.post('/', paymentController.recordTransaction)
    router.post(
        "/webhook",
        paymentController.webhook.bind(paymentController)
      );
  router.post('/create-checkout-session', paymentController.stripePayment)
  router.get("/session-details/:sessionId", paymentController.getSessionDetails); 
  router.get("/transaction_history/:id",paymentController.getTransactionHistory)
    
    return router
}