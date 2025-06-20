import { Neighbor } from '../../domain/entities/Neighbor';
import { User } from '../../domain/entities/User';
import { NeighborInfo } from './NeighborsDTO';
import { userGeneralInfo } from './UserDTO';

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
  est_amount:string
  prefferedDate: Date | string; 
  prefferedTime: "morning" | "afternoon" | "evening";
  timeSlot?: {
    startTime?: number; 
    endTime?: number; 
  };
  ratePerHour: number;
  baseAmount: number;
  platform_fee: number;
  extra_charges?: number;
  final_amount: number;
  additional_notes?: number;
  task_status?: TaskStatus; 
  payment_status?: PaymentStatus;
  task_code?:string
  
}

export interface taskAcceptDetails{
  startTime: string,
  est_hours: number,
  extra_charges: number,
  additional_notes: string,
  baseAmount:number
}
export interface ExtendedTaskAcceptDetails extends taskAcceptDetails {
  endTime: string;
  platform_fee: number;
  final_amount: number;
}

export interface TaskRequestDetails{
  createdBy: User | string; 
  assignedNeighbor?: Neighbor | string; 
  location: string;
  category: string;
  subCategory: string;
  description: string;
  est_hours: string;
  prefferedDate: Date | string;
  ratePerHour: number;
  est_amount:string
}