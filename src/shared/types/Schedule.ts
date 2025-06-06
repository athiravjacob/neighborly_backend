
export interface Schedule{
    neighborId: string,
    availability: {
        dayOfWeek: "mon" | "tue" | "wed" | "thur" | "fri" | "sat" | "sun",
        timeslot: [{
            startTime: number,
            endTime:number
        }]
    }
}