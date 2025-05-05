export interface TransactionDetails{
    id?: String,
    userId: string,
    neighborId: string,
    taskId: String,
    stripeTransactionId: string,
    amount: number;
    transactionDate:Date

}