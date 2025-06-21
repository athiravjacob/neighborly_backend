import { Schema, model } from 'mongoose';

type TaskStatus = "pending" | "assigned" | "in_progress" | "completed" | "cancelled";

type PaymentStatus ="pending"| "paid"| "dispute"
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
    type: String,
    required: true,
  },
  prefferedDate: {
    type: Date,
    required: true
  },
  
  timeSlot: {
    startTime: {
      type: Number,
    },
    endTime: {
      type: Number,
      default: null
    }
   
  },
  est_amount: String, 
  task_status: {
    type: String,
    enum: ["pending", "assigned", "in_progress", "completed", "cancelled"],
    default: "pending"
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "dispute"],
    default: "pending"
  },
  ratePerHour: {
    type: Number,
    required: true,
    min: [0, 'Rate per hour cannot be negative']
  },
  actual_hours: {
    type: Number,
    default: null,
    min: [0, 'Actual hours cannot be negative']
  },
  base_amount: {
    type: Number,
    default: null,
    min: [0, 'Base amount cannot be negative']
  },
  platform_fee: {
    type: Number,
    default: null,
    min: [0, 'Platform fee cannot be negative']
  },
  extra_charges: {
    type: Number,
    default: null,
    min: [0, 'extra charges cannot be negative']
  },
  final_amount: {
    type: Number,
    default: null,
    min: [0, 'Final amount cannot be negative']
  }, 
  task_code: {
    type: String,
    default:null
}
}, {
  timestamps: true
});





export const TaskModel = model('Task', taskSchema);