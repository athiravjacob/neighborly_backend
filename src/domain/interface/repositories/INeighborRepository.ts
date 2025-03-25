import { LocationDetailsDTO } from "../../../shared/types/LocationDetailsDTO";
import { SkillsDTO } from "../../../shared/types/SkillsDTO";
import { TimeslotDTO } from "../../../shared/types/TimeslotDTO";
import { Neighbor } from "../../entities/Neighbor";

export interface INeighborRepository{
    updateLocation(id: string, updatedLocation: LocationDetailsDTO ): Promise<void>;
    saveAvailabilty(id: string, availability: { date: Date; timeSlots: { startTime: number; endTime: number; }[]; }[]): Promise<Neighbor>;    findNeighborByEmail(email: string): Promise<Neighbor | null>;
    createNeighbor(user: Neighbor): Promise<Neighbor>;
    saveSkills(id: string, skill: SkillsDTO): Promise<Neighbor>;
    getavailableTimeslot(id:string):Promise<TimeslotDTO[] | null>
}