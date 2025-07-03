
export class Wallet{
    constructor(
        public id: string,
        public role:"Admin"|"User"|"Neighbor",
        public holder_id: string,
        public balance: number,
        public withdrawableBalance: number,  
        
    ){
        this.validate();
      }
    
      validate(): void {
        if (this.balance < 0) throw new Error("Balance cannot be negative");
        if (this.withdrawableBalance < 0) throw new Error("Withdrawable balance cannot be negative");
        if (this.withdrawableBalance > this.balance) throw new Error("Withdrawable balance cannot exceed balance");
        if (!this.holder_id) throw new Error("Neighbor ID required");
      }
}