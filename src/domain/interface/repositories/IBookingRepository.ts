import { Booking } from "../../../shared/types/Booking";

export interface IBookingRepository{
    getBookingDetails(neighborId:string,startDate:Date,endDate?:Date):Promise<Booking[]|[]>
}