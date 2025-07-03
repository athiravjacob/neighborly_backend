import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../shared/utils/responseHandler";
import { saveTransaction } from "../../application/usecases/payment/saveTransactionUsecase";
import { TransactionDetails } from "../../shared/types/TransactionDetails";
import Stripe from "stripe";
import dotenv from "dotenv";
import { generateOTP } from "../../shared/utils/generateOTP";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";
import { getIO } from "../../infrastructure/socket/socketServer";
import { number } from "joi";
import { WalletUsecase } from "../../application/usecases/payment/walletUsecase";

dotenv.config();

export class PaymentController {
  private stripe: Stripe;

  constructor(
    private recordTransactionUsecase: saveTransaction,
    private taskUsecase: TaskUsecase,
    private walletUsecase: WalletUsecase,

    
  ) {
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
      const { userId, neighborId, taskId,  base_amount,
        platform_fee,
        total_amount, stripeTransactionId, transactionDate } = req.body;
      const paymentDetails: TransactionDetails = {
        userId,
        neighborId,
        taskId,
        stripeTransactionId,
        base_amount,
        platform_fee,
        total_amount,
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
        success_url: "http://localhost:5173/payment_success?session_id={CHECKOUT_SESSION_ID}",
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
      console.log(event,"event")

      // Handle checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const taskCode = generateOTP()
        console.log("task code",taskCode)

        // Retrieve session with payment intent
        const fullSession = await this.stripe.checkout.sessions.retrieve(session.id, {
          expand: ["payment_intent"],
        });
        console.log(fullSession)
        // Extract transaction details
        const paymentDetails: TransactionDetails = {
          userId: fullSession.metadata?.userId! ,
          neighborId: fullSession.metadata?.neighborId || "unknown",
          taskId: fullSession.metadata?.taskId || "",
          stripeTransactionId: (fullSession.payment_intent as Stripe.PaymentIntent)?.id || "",
          base_amount: Number(fullSession.metadata?.base_amount),
          platform_fee:Number(fullSession.metadata?.platform_fee),
          total_amount: fullSession.amount_total ? fullSession.amount_total / 100 : 0,
          transactionDate: new Date(fullSession.created * 1000),
        };
        console.log(paymentDetails, "paymnt details")
        await this.taskUsecase.updateTaskCode(fullSession.metadata?.taskId!,taskCode)
        // Record transaction
        const adminId = "6831539c71b6c6e0e8a706ae"
        const recordTransactionHistory = await this.recordTransactionUsecase.execute(paymentDetails);
        const updateNeighborWallet = await this.walletUsecase.add_wallet_balance("Neighbor",paymentDetails.neighborId,paymentDetails.base_amount)
        const updateAdminWallet = await this.walletUsecase.add_wallet_balance("Admin",adminId,paymentDetails.platform_fee)
        console.log("Transaction recorded:", recordTransactionHistory);

      
      }

      
      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).send(`Webhook Error: ${(error as Error).message}`);
      return;
    }
  };

  getSessionDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { sessionId } = req.params;
      if (!sessionId) {
        throw new Error("Session ID is required");
      }
  
      // Retrieve Stripe session with payment intent
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent"],
      });
  
      // Fetch taskCode from taskUsecase (assumes taskCode is stored in DB)
      const taskCode = await this.taskUsecase.getTaskCode(session.metadata?.taskId || "");
      const taskDetails = await this.taskUsecase.getTaskById(session.metadata?.taskId!)
      // Construct transaction details
      const transactionDetails = {
        stripeTransactionId: (session.payment_intent as Stripe.PaymentIntent)?.id || "",
        amount: session.amount_total ? session.amount_total / 100 : 0,
        transactionDate: new Date(session.created * 1000).toISOString(),
        taskDetails:taskDetails,
        taskCode: taskCode || "",
      };
  
      successResponse(res, 200, "Session details retrieved", transactionDetails);
    } catch (error) {
      console.log(error)
      console.error("Error retrieving session details:", error);
      next(error);
    }
  };

  getTransactionHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    try {
      const  id  = req.params.neighborId
      const transactions = await this.recordTransactionUsecase.neighborTransactions(id)
      console.log(transactions)
      successResponse(res, 200, "Neighbor earnings retrieved", transactions);

      
    } catch (error) {
      next(error)
    }
  }

 

}