
export class Escrow {
    constructor(
        public id: string,
        public transactionId: string,
        public admin_Approval: "pending" | "approved" | "rejected",
        public transferStatus: "pending" | "transfered" | "dispute",
        public transferdDate?:string
    ) {
        
    }
}