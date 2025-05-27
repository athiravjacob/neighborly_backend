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
          timeSlots: [
            {
              startTime: {
                type: Number,
                required: true,
              },
              endTime: {
                type: Number,
                required: true,
              },
            },
          ],
        },
      ],
});
    
export const scheduleModel = mongoose.model('Schedule',scheduleSchema)