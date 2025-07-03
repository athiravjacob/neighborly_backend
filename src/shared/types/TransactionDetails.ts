export interface TransactionDetails{
    id?: string,
    userId: string,
    neighborId: string,
    taskId: string,
    stripeTransactionId: string,
    base_amount: number,
    platform_fee:number,
    total_amount: number;
    transactionDate:Date

}