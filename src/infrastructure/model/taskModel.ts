import { Schema, model, Types } from 'mongoose';

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
  est_amount: Number, 
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
  platform_fee: {
    type: Number,
    default: null,
    min: [0, 'Platform fee cannot be negative']
  },
  final_amount: {
    type: Number,
    default: null,
    min: [0, 'Final amount cannot be negative']
  }
}, {
  timestamps: true
});

taskSchema.pre('save', function (next) {
  if (this.ratePerHour != null && this.est_hours != null) {
    this.baseAmount = this.ratePerHour * this.est_hours;

    this.platform_fee = this.baseAmount * 0.05;

    this.final_amount = this.baseAmount + this.platform_fee;
  }

  next();
});

export const TaskModel = model('Task', taskSchema);