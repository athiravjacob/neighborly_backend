export interface IEscrowRepository{
    pendingPayment(transactionId:string):Promise<string>

}