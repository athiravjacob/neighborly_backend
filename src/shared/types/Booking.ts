export interface Booking{
    neighborId: string;
    taskId: string;
    date: Date;
    startTime: number;
    endTime: number;
    status:  "pending"| "confirmed"| "completed"| "cancelled"

}