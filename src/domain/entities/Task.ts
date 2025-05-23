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
        public est_hours: number,
        public prefferedDate: Date,
        public prefferedTime:"morning"|"afternoon"|"evening",
        public est_amount: number,
        public task_status: TaskStatus,
        public payment_status: PaymentStatus,
        public ratePerHour: number,
        public timeSlot?: {
            startTime: number,  
            endTime: number,
        },
        public actualHours?: number,
        public baseAmount?: number, 
        public platform_fee?: number,
        public extra_charges?:number,
        public final_amount?: number,
        public additional_notes?:string,
        public task_code?:string|null
    ) {}

    // Calculate actual hours based on start and end time
    // calculateActualHours(): number | null {
    //     if (!this.timeSlot.startTime || !this.timeSlot.endTime) {
    //         return null;
    //     }

    //     const diffMs = this.timeSlot.endTime - this.timeSlot.startTime;
    //     this.actualHours = diffMs / 3600000; 
    //     return this.actualHours;
    // }

    // calculateFinalAmount(): number | null {
    //     if (this.actualHours === undefined || this.ratePerHour === undefined) {
    //         return null;
    //     }

    //     const baseAmount = this.actualHours * this.ratePerHour;
    //     const adminFee = baseAmount * this.ADMIN_FEE_PERCENTAGE;
    //     this.final_amount = baseAmount + adminFee; // Add 5% admin fee
    //     return this.final_amount;
    // }

    // // Complete task and calculate hours and final amount
    // // completeTask(endTime: number): void {
    // //     this.timeSlot.endTime = endTime;
    // //     this.calculateActualHours();
    // //     this.calculateFinalAmount();
    // //     this.task_status = TaskStatus.COMPLETED;
    // // }

    // setActualHours(hours: number): void {
    //     this.actualHours = hours;
    //     this.calculateFinalAmount();
    // }

    // getAmountBreakdown(): { baseAmount: number; adminFee: number; total: number } | null {
    //     if (this.final_amount === undefined || this.actualHours === undefined) {
    //         return null;
    //     }

    //     const baseAmount = this.actualHours * this.ratePerHour;
    //     const adminFee = baseAmount * this.ADMIN_FEE_PERCENTAGE;
    //     return {
    //         baseAmount,
    //         adminFee,
    //         total: this.final_amount
    //     };
    // }
}

