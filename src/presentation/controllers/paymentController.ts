import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../shared/utils/responseHandler";
import { saveTransaction } from "../../application/usecases/payment/saveTransactionUsecase";
import { TransactionDetails } from "../../shared/types/TransactionDetails";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export class PaymentController {
  private stripe: Stripe;

  constructor(private recordTransactionUsecase: saveTransaction) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    console.log(stripeSecretKey, "stripe key");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-04-30.basil",
    });
  }

  recordTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, neighborId, taskId, amount, stripeTransactionId, transactionDate } = req.body;
      const paymentDetails: TransactionDetails = {
        userId,
        neighborId,
        taskId,
        stripeTransactionId,
        amount,
        transactionDate,
      };
      const recordTransactionHistory = await this.recordTransactionUsecase.execute(paymentDetails);
      successResponse(res, 200, "Transaction Details updated successfully", recordTransactionHistory);
    } catch (error) {
      next(error);
    }
  };

  stripePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { amount, currency, description, metadata } = req.body;
      if (!amount || !currency || !description) {
        throw new Error("Missing required fields: amount, currency, or description");
      }
      console.log(metadata)

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: description,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173/cancel",
        metadata: metadata || {},
      });

      successResponse(res, 200, "Checkout session created", { sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      next(error);
    }
  };

  webhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not defined in environment variables");
    }

    if (!sig) {
      res.status(400).send("Missing stripe-signature header");
      return;
    }

    try {
      // Verify webhook signature
      const event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

      // Handle checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve session with payment intent
        const fullSession = await this.stripe.checkout.sessions.retrieve(session.id, {
          expand: ["payment_intent"],
        });

        // Extract transaction details
        const paymentDetails: TransactionDetails = {
          userId: fullSession.metadata?.userId! ,
          neighborId: fullSession.metadata?.neighborId || "unknown",
          taskId: fullSession.metadata?.taskId || "",
          stripeTransactionId: (fullSession.payment_intent as Stripe.PaymentIntent)?.id || "",
          amount: fullSession.amount_total ? fullSession.amount_total / 100 : 0,
          transactionDate: new Date(fullSession.created * 1000),
        };
        console.log(paymentDetails,"paymnt details")
        // Record transaction
        const recordTransactionHistory = await this.recordTransactionUsecase.execute(paymentDetails);
        console.log("Transaction recorded:", recordTransactionHistory);
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).send(`Webhook Error: ${(error as Error).message}`);
      return;
    }
  };
}