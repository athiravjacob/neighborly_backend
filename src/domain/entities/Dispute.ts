export class Dispute{
    constructor(
        public _id: string,
        public taskId: string,
        public reporter_role: "neighbor" |"user",
        public reportedBy: string,
        public details: string,
        public dispute_status :"open"|"under_review"|"resolved"|"rejected"
    ){}
}