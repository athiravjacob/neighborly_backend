import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema({
    neighborId: {
        type: Schema.Types.ObjectId,
        ref: 'Neighbor',
        required: true,
        index:true
    },
    availability: [
        {
          dayOfWeek: {
            type: String,
            enum: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"],
            required: true,
          },
          timeslot: [
            {
              startTime: {
                type: Number,
                required: true,
                min: 0,
                max: 1440, // 24 hours * 60 minutes
              },
              endTime: {
                type: Number,
                required: true,
                min: 0,
                max: 1440,
                validate: {
                    validator: function (this: { startTime: number; endTime: number }, endTime: number) {
                        return endTime > this.startTime;
                  },
                  message: "endTime must be greater than startTime",
                },
              },
            },
          ],
        },
      ],
});
    
export const scheduleModel = mongoose.model('Schedule',scheduleSchema)