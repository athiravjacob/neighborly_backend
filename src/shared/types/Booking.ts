export interface BookingDetails{
    neighborId: string;
    taskId: string;
    date: Date;
    startTime: number;
    endTime: number;
    bufferTime: number;
    status:  "pending"| "confirmed"| "completed"| "cancelled"

}