export interface TransactionDetails{
    id?: string,
    userId: string,
    neighborId: string,
    taskId: string,
    stripeTransactionId: string,
    amount: number;
    transactionDate:Date

}