import express, { Router } from "express";
import { PaymentController } from "../controllers/paymentController";
import { Routes } from "../../shared/constants/routes";
export default function setupPaymentRoutes(paymentController: PaymentController): Router{
    const router = Router()
    router.post(Routes.PAYMENTS.RECORD, paymentController.recordTransaction)
    router.post(Routes.PAYMENTS.WEBHOOK,
        paymentController.webhook.bind(paymentController)
      );
  router.post(Routes.PAYMENTS.CHECKOUT_SESSION, paymentController.stripePayment)
  router.get(Routes.PAYMENTS.SESSION_DETAILS, paymentController.getSessionDetails); 
  // router.get("/:id/transaction_history",paymentController.getTransactionHistory)
    
    return router
}