import { Neighbor } from '../../domain/entities/Neighbor';
import { User } from '../../domain/entities/User';

// Enums for task and payment status (for type safety)
export type TaskStatus = "pending" | "assigned" | "in_progress" | "completed" | "cancelled";


export type PaymentStatus ="pending"| "paid"| "dispute"


// Interface for TaskDetails (data from frontend)
export interface TaskDetails {
  id:string
  createdBy: User; 
  assignedNeighbor: Neighbor ; 
  location: string;
  category: string;
  subCategory: string;
  description: string;
  est_hours: number;
  prefferedDate: Date | string; 
  timeSlot: {
    startTime: number; 
    endTime?: number; 
  };
  ratePerHour: number;
  baseAmount: number;
  platform_fee: number;
  final_amount: number;
  task_status?: TaskStatus; 
  payment_status?: PaymentStatus;
  task_code?:string
  
}