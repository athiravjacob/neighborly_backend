export class Booking{
    constructor(
        public _id: string,
        public taskId: string,
        public neighborId: string,
        public date: Date,
        public startTime: number,
        public endTime: number,
        public status:"pending"| "confirmed"| "completed"| "cancelled"
    ){}
}     
