import { IBookingRepository } from "../../domain/interface/repositories/IBookingRepository";
import { BookingDetails } from "../../shared/types/Booking";
import { AppError } from "../../shared/utils/errors";
import {bookingModel} from '../model/bookingModel'

export class bookingRepository implements IBookingRepository {
    async addBookingDetails(booking:BookingDetails): Promise<void> {
        await bookingModel.create(booking)
    }
    async updateBookingStatus(taskId: string, neighborId: string, status: string): Promise<void> {
        await bookingModel.updateOne({ taskId, neighborId }, { $set: { status } })
    }
    async getBookingDetails(neighborId: string, startDate: Date, endDate?: Date): Promise<BookingDetails[] | []> {
        try {
          
            const endOfDay = endDate ? endDate : startDate
           
            const bookings = await bookingModel
                .find({
                    neighborId,
                    date: { $gte: startDate, $lte: endOfDay },
                })
                .sort({ date: 1, startTime: 1 })
                .lean();
    
    
            if (!bookings || bookings.length === 0) return [];
    
            return JSON.parse(JSON.stringify(bookings))
        } catch (error) {
            console.error("Error in getBookingDetails:", error);
            throw error;
        }
    }
}