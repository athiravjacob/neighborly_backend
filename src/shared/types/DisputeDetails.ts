export interface DisputeDetails{
    id?:string,
    taskId: string,
    reporter_role:"Neighbor"|"User",
    reportedBy: string,
    details: string,
    dispute_status:"open"|"under_review"|"resolved"|"rejected"

}