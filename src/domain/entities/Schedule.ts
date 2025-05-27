export class Schedule{
    constructor(
        public _id: string,
        public neighborId:string,
        public availability: {
            dayOfWeek: "mon"|"tue"|"wed"|"thur"|"fri"|"sat"|"sun";
            timeSlots: { startTime: number; endTime: number }[];
          }[] = [] 
    ){}
}