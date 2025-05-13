
export class TransactionHistory{
    constructor(
        public id: string,
        public userId: string,
        public neighborId: string,
        public taskId: string,
        public transactionId: string,
        public transactionDate: string,
        public amount: string,
    ){}
}