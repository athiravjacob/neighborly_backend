export interface Schedule {
    neighborId: string;
    availability: {
      dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
      timeslots: { startTime: number; endTime: number }[];
    }[];
  }