import { ObjectId } from "mongoose";

enum TaskStatus {
    PENDING = 'pending',
    ASSIGNED = 'assigned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    DISPUTED = 'disputed'
}


export class Task {
    private readonly ADMIN_FEE_PERCENTAGE = 0.05; 

    constructor(
        public id: string|undefined,
        public createdBy: string,
        public assignedNeighbor: string ,
        public location: string,
        public category: string,
        public subCategory: string,
        public description: string,
        public est_hours: string,
        public prefferedDate: Date,
        public est_amount: string,
        public task_status: TaskStatus,
        public payment_status: PaymentStatus,
        public ratePerHour: number,
        public actual_hours?: number,
        public baseAmount?: number, 
        public platform_fee?: number,
        public extra_charges?:number,
        public final_amount?: number,
        public additional_notes?:string,
        public task_code?:string|null
    ) {}

   
   
}

