import { Request,Response,NextFunction } from "express";
import { successResponse } from "../../shared/utils/responseHandler";
import { saveTransaction } from "../../application/usecases/payment/saveTransactionUsecase";
import { TransactionDetails } from "../../shared/types/TransactionDetails";

export class PaymentController{
    constructor(
        private recordTransactionUsecase:saveTransaction
    ) { }
    
    recordTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId, neighborId, taskId, amount, stripeTransactionId, transactionDate } = req.body
            const paymentDetails:TransactionDetails ={userId,neighborId,taskId,stripeTransactionId,amount,transactionDate}
            const recordTransactionHistory = await this.recordTransactionUsecase.execute(paymentDetails)
            successResponse(res,200,'Transacton Details updated successfully',recordTransactionHistory)

        } catch (error) {
            next(error)
        }
    }
}