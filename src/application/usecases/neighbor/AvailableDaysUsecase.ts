import { IBookingRepository } from "../../../domain/interface/repositories/IBookingRepository";
import { IScheduleRepository } from "../../../domain/interface/repositories/IScheduleRepository";

export class AvailableDaysUsecase{
    constructor(
        private scheduleRepository: IScheduleRepository,
        private bookingRepository: IBookingRepository
    ) { }
    async getAvailableDays(
        neighborId: string,
        duration: number
      ): Promise<{ date: string; available: boolean; timeslot: { startTime: number; endTime: number } | null }[]> {
        const today = new Date();
        const next7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          return {
            date: date.toISOString().split('T')[0],
            dayOfWeek: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][date.getDay()]
          };
        });
        const schedule = await this.scheduleRepository.getNeighborSchedule(neighborId);
        console.log("schedule", schedule);
        if (!schedule) return next7Days.map(day => ({ date: day.date, available: false, timeslot: null }));
      
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 6);
        const bookings = await this.bookingRepository.getBookingDetails(neighborId, today, endDate);
        console.log("bookings", bookings);
      
        return next7Days.map(day => {
          const daySchedule = schedule.availability.find(a => a.dayOfWeek === day.dayOfWeek);
          console.log(`Day ${day.date} (${day.dayOfWeek}):`, daySchedule?.timeslots);
          if (!daySchedule || !daySchedule.timeslots.length) {
            return { date: day.date, available: false, timeslot: null };
          }
      
          let adjustedTimeslots = [...daySchedule.timeslots];
          bookings.forEach(booking => {
            adjustedTimeslots = adjustedTimeslots
              .map(slot => {
                if (booking.endTime <= slot.startTime || booking.startTime >= slot.endTime) return slot;
                const newSlots = [];
                if (booking.startTime > slot.startTime) {
                  newSlots.push({ startTime: slot.startTime, endTime: booking.startTime });
                }
                const bufferEnd = booking.endTime + 30;
                if (bufferEnd < slot.endTime) {
                  newSlots.push({ startTime: bufferEnd, endTime: slot.endTime });
                }
                return newSlots;
              })
              .flat()
              .filter(slot => slot.endTime > slot.startTime);
          });
      
          console.log(`Adjusted timeslots for ${day.date}:`, adjustedTimeslots);
          console.log(`Duration type: ${typeof duration}, value: ${duration}`);
          const timeslot = adjustedTimeslots.find(slot => {
            const slotDuration = Number(slot.endTime) - Number(slot.startTime);
            console.log(`Slot ${slot.startTime}-${slot.endTime}: duration=${slotDuration}`);
            return slotDuration >= duration;
          });
      
          return {
            date: day.date,
            available: !!timeslot,
            timeslot: timeslot ? { startTime: timeslot.startTime, endTime: Number(timeslot.startTime) + duration } : null
          };
        });
      }
}