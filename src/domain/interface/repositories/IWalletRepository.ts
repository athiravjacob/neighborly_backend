export interface IWalletRepository{
    updateWalletBalance(neighborId:string,escrowId:string,balance:number):Promise<void>
}