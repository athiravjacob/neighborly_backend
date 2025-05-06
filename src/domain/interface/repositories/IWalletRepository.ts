export interface IWalletRepository{
    updateWalletBalance(neighborId:string,balance:number):Promise<void>
}