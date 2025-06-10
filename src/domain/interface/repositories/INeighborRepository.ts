import { LocationDetailsDTO, locationDTO } from "../../../shared/types/LocationDetailsDTO";
import { Availability, NeighborInfo } from "../../../shared/types/NeighborsDTO";
import { SkillsDTO } from "../../../shared/types/SkillsDTO";
import { TimeslotDTO } from "../../../shared/types/TimeslotDTO";
import { Neighbor } from "../../entities/Neighbor";

export interface INeighborRepository{
    fetchAllNeighbors():Promise<NeighborInfo[]|[]>
    updateLocation(neighborId: string, updatedLocation: LocationDetailsDTO ): Promise<locationDTO>;
    saveAvailabilty(neighborId: string, availability: { date: Date; timeSlots: { startTime: number; endTime: number; note: "available" | "booked" }[]; }[]): Promise<Neighbor>;
    findNeighborByEmail(email: string): Promise<Neighbor | null>;
    createNeighbor(user: Neighbor): Promise<Neighbor>;
    saveSkills(neighborId: string, skill: SkillsDTO): Promise<SkillsDTO[]>;
    getSkills(neighborId: string): Promise<SkillsDTO[] | null>,
    getavailableTimeslot(neighborId: string): Promise<Availability[] | null>
    getServiceLocation(neighborId: string): Promise<locationDTO>
    

    getAvailableNeighborsList(lng:number,lat: number, subCategory: string): Promise<NeighborInfo[] | []>
    checkServiceAvailability(city: string, subCategory: string): Promise<Boolean>
    uploadId(neighborId: string, idCardImage: string): Promise<Boolean>
    fetchVerifyStatus(neighborId: string): Promise<Boolean>
    verifyNeighbor(neighborId: string): Promise<void>
    
    ban_or_unban(neighborId: string): Promise<Boolean>
    isBanned(neighborId: string): Promise<Boolean>
    
    fetchPassword(neighborId: string): Promise<string>
    updatePassword(neighborId: string, newPasswordHashed: string): Promise<void>


}