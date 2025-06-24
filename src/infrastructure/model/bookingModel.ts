import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },
    neighborId: {
      type: Schema.Types.ObjectId,
      ref: "Neighbor",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    startTime: {
      type: Number,
      required: true,
      min: 0,
      max: 1440,
    },
    endTime: {
      type: Number,
      required: true,
      min: 0,
      max: 1440,
      validate: {
        validator: function (this: { startTime: number }, endTime: number) {
          return endTime > this.startTime;
        },
        message: "endTime must be greater than startTime",
      },
    },
    bufferTime: {
      type: Number,
      default:30
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ neighborId: 1, date: 1 });
export const bookingModel = mongoose.model("Booking", bookingSchema);