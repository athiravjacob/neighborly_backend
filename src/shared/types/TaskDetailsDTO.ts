import { Types } from 'mongoose';
import { Neighbor } from '../../domain/entities/Neighbor';
import { User } from '../../domain/entities/User';

// Enums for task and payment status (for type safety)
export enum TaskStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  DISPUTED = 'disputed'
}

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
  task_status?: TaskStatus; 
  payment_status?: PaymentStatus; 
}