export interface IEscrowRepository{
    pendingPayment(transactionId:string,neighborId:string,amount:number):Promise<string>

}