import { BookingDetails } from "../../../shared/types/Booking";

export interface IBookingRepository {
    getBookingDetails(neighborId: string, startDate: Date, endDate?: Date): Promise<BookingDetails[] | []>
    addBookingDetails(booking:BookingDetails): Promise<void>
    updateBookingStatus(taskId: string, neighborId: string, status: string): Promise<void>
}