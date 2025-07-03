
export class TransactionHistory{
    constructor(
        public id: string,
        public userId: string,
        public neighborId: string,
        public taskId: string,
        public transactionId: string,
        public transactionDate: string,
        public base_amount: number,
        public platform_fee:number,
        public total_amount: number,
    ){}
}