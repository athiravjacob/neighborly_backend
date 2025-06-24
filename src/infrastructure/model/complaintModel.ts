import mongoose, { Schema } from "mongoose";
import { Task } from "../../domain/entities/Task";

const complaintSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    reporter_role: {
        type: String,
        enum: ["Neighbor", "User"],
        required: true
    },
    reportedBy: {
        type: Schema.Types.ObjectId,
        refPath:'reporter_role'
    },
    details: String,
    dispute_status: {
        type: String,
        enum: ["open", "under_review", "resolved", "rejected"],
        default: "open"
      }
      
},{timestamps:true}


)

export const ComplaintModel = mongoose.model('Complaint',complaintSchema)