import { LocationDetailsDTO, locationDTO } from "../../../shared/types/LocationDetailsDTO";
import { SkillsDTO } from "../../../shared/types/SkillsDTO";
import { TimeslotDTO } from "../../../shared/types/TimeslotDTO";
import { Neighbor } from "../../entities/Neighbor";

export interface INeighborRepository{
    updateLocation(id: string, updatedLocation: LocationDetailsDTO ): Promise<locationDTO>;
    saveAvailabilty(id: string, availability: { date: Date; timeSlots: { startTime: number; endTime: number; }[]; }[]): Promise<Neighbor>;    findNeighborByEmail(email: string): Promise<Neighbor | null>;
    createNeighbor(user: Neighbor): Promise<Neighbor>;
    saveSkills(id: string, skill: SkillsDTO): Promise<SkillsDTO[]>;
    getSkills(id: string): Promise<SkillsDTO[] | null>,
    getavailableTimeslot(id: string): Promise<TimeslotDTO[] | null>
    getServiceLocation(id:string):Promise<locationDTO>
}