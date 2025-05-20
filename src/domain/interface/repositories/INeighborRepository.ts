import { LocationDetailsDTO, locationDTO } from "../../../shared/types/LocationDetailsDTO";
import { NeighborInfo } from "../../../shared/types/NeighborsDTO";
import { SkillsDTO } from "../../../shared/types/SkillsDTO";
import { TimeslotDTO } from "../../../shared/types/TimeslotDTO";
import { Neighbor } from "../../entities/Neighbor";

export interface INeighborRepository{
    fetchAllNeighbors():Promise<NeighborInfo[]|[]>
    updateLocation(id: string, updatedLocation: LocationDetailsDTO ): Promise<locationDTO>;
    saveAvailabilty(id: string, availability: { date: Date; timeSlots: { startTime: number; endTime: number; }[]; }[]): Promise<Neighbor>;    findNeighborByEmail(email: string): Promise<Neighbor | null>;
    createNeighbor(user: Neighbor): Promise<Neighbor>;
    saveSkills(id: string, skill: SkillsDTO): Promise<SkillsDTO[]>;
    getSkills(id: string): Promise<SkillsDTO[] | null>,
    getavailableTimeslot(id: string): Promise<TimeslotDTO[] | null>
    getServiceLocation(id: string): Promise<locationDTO>
    

    getAvailableNeighborsList(city: string, subCategory: string): Promise<NeighborInfo[] | []>
    checkServiceAvailability(city: string): Promise<Boolean>
    uploadId(id: string, idCardImage: string): Promise<Boolean>
    fetchVerifyStatus(id: string): Promise<Boolean>
    verifyNeighbor(id: string): Promise<void>
    
    ban_or_unban(id: string): Promise<Boolean>
    isBanned(id: string): Promise<Boolean>
    
    fetchPassword(id: string): Promise<string>
    updatePassword(id: string, newPasswordHashed: string): Promise<void>


}