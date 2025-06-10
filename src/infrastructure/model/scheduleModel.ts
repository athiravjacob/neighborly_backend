import mongoose, { Schema } from "mongoose";

// Define the enum type for dayOfWeek
type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const scheduleSchema = new Schema(
  {
    neighborId: {
      type: Schema.Types.ObjectId,
      ref: "Neighbor",
      required: true,
      unique: true,
      index: true,
    },
    availability: [
      {
        dayOfWeek: {
          type: String,
          enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
          required: true,
        },
        timeslots: [
          {
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
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure all 7 days are present in availability
scheduleSchema.pre("save", function (next) {
  const days: DayOfWeek[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const existingDays = this.availability.map((item) => item.dayOfWeek);
  const missingDays = days.filter((day) => !existingDays.includes(day));

  if (missingDays.length > 0) {
    this.availability.push(
      ...missingDays.map((day) => ({
        dayOfWeek: day,
        timeslots: [],
      }))
    );
  }

  // Sort days for consistency
  this.availability.sort((a, b) => days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek));
  next();
});

export const scheduleModel = mongoose.model("Schedule", scheduleSchema);