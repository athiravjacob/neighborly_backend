
export class Wallet{
    constructor(
        public id: string,
        public neighborId: string,
        public escrowId:string,
        public balance: number,
        public withdrawableBalance: number,  
        
        
    ){
        this.validate();
      }
    
      validate(): void {
        if (this.balance < 0) throw new Error("Balance cannot be negative");
        if (this.withdrawableBalance < 0) throw new Error("Withdrawable balance cannot be negative");
        if (this.withdrawableBalance > this.balance) throw new Error("Withdrawable balance cannot exceed balance");
        if (!this.neighborId) throw new Error("Neighbor ID required");
      }
}