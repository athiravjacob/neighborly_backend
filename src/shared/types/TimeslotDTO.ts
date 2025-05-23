export interface TimeslotDTO{
    date: Date,
    timeslots:[{startTime:number,endTime:number,note:"available"|"booked" ,_id:string}]
    
}