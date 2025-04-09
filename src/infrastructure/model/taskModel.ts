import { Schema, model, Types } from 'mongoose';

const TaskStatus = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

const PaymentStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  DISPUTED: 'disputed'
} as const;

const taskSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    index: true 
  },
  assignedNeighbor: {
    type: Schema.Types.ObjectId,
    ref: 'Neighbor', 
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  est_hours: {
    type: Number,
    required: true,
    min: [0, 'Estimated hours cannot be negative']
  },
  prefferedDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    startTime: {
      type: Number, 
      required: true
    },
    endTime: {
      type: Number, 
      default: null 
    }
    },
  est_amount:Number,
  task_status: {
    type: String,
    enum: Object.values(TaskStatus), 
    default: TaskStatus.PENDING,
    required: true
  },
  payment_status: {
    type: String,
    enum: Object.values(PaymentStatus), 
    default: PaymentStatus.PENDING,
    required: true
  },
  ratePerHour: {
    type: Number,
    required: true,
    min: [0, 'Rate per hour cannot be negative']
  },
  actualHours: {
    type: Number,
    default: null, 
    min: [0, 'Actual hours cannot be negative']
  },
  baseAmount: {
    type: Number,
    default: null, 
    min: [0, 'Base amount cannot be negative']
  },
  final_amount: {
    type: Number,
    default: null, 
    min: [0, 'Final amount cannot be negative']
  }
}, {
  timestamps: true 
});

export const TaskModel = model('Task', taskSchema);