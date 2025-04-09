import { Types } from 'mongoose';

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
  createdBy: string; 
  assignedNeighbor: string ; 
  location: string;
  category: string;
  subCategory: string;
  description: string;
  est_hours: number;
  prefferedDate: Date | string; // Accept Date object or ISO string
  timeSlot: {
    startTime: number; // Unix timestamp in milliseconds
    endTime?: number; // Optional, likely not provided at creation
  };
  ratePerHour: number;
  task_status?: TaskStatus; // Optional, defaults to PENDING
  payment_status?: PaymentStatus; // Optional, defaults to PENDING
}