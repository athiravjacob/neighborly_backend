import { TaskDetails } from "./TaskDetailsDTO";

export interface DisputeDetails{
    _id?:string,
    taskId: string|TaskDetails,
    reporter_role:"Neighbor"|"User",
    reportedBy: string | { id: string; name: string };
    details: string,
    dispute_status?:"open"|"under_review"|"resolved"|"rejected"

}