import { Neighbor } from "../../domain/entities/Neighbor";
import { INeighborRepository } from "../../domain/interface/repositories/INeighborRepository";
import { LocationDetailsDTO, locationDTO } from "../../shared/types/LocationDetailsDTO";
import { NeighborInfo } from "../../shared/types/NeighborsDTO";
import { SkillsDTO } from "../../shared/types/SkillsDTO";
import { TimeslotDTO } from "../../shared/types/TimeslotDTO";
import { errorHandler } from "../../shared/utils/errorHandler";
import { neighborModel } from "../model/neigborModel";

export class neighborRepository implements INeighborRepository{

  async checkServiceAvailability(city: string): Promise<Boolean> {
    try {
      console.log(city)
      const exists = await neighborModel.exists({ "availableLocation.city": city })
      return !!exists
            
    } catch (error) {
      if (error instanceof Error) {
        throw { statusCode: 500, message: error.message || "Error checking service availablity" };
    } else {
        throw { statusCode: 500, message: "An unknown error occurred while checking service availablity" };
    }
    }
  }

  //****************** Get Available Neighbors List ************** */
  async getAvailableNeighborsList(city: string, subCategory: string): Promise<NeighborInfo[]> {
    try {
      console.log(city,subCategory,"neighb Repo")
      const neighbors = await neighborModel.aggregate([
        {
          $match: {
            "availableLocation.city": city,
            "skills.subcategories": subCategory
          }
        },
        {
          $addFields: {
            skills: {
              $filter: {
                input: "$skills",
                as: "skill",
                cond: { $in: [subCategory, "$$skill.subcategories"] }
              }
            }
          }
        },
        {
          $project: {
            password: 0
          }
        }
      ]);
      if(neighbors.length === 0) return []
      
        return neighbors;
    } catch (error) {
      if (error instanceof Error) {
        throw { statusCode: 500, message: error.message || "Error fetching available neighbors" };
    } else {
        throw { statusCode: 500, message: "An unknown error occurred while fetching available neighbors" };
    }
    }
}

  //****************** fetch service location*********************** */
  async getServiceLocation(id: string): Promise<locationDTO> {
    const location = await neighborModel.findById(id, { availableLocation: 1 })
    return location ?  JSON.parse(JSON.stringify(location.availableLocation)) : null  }


  async getSkills(id: string): Promise<SkillsDTO[] | null> {
    const skills = await neighborModel.findById(id, { skills: 1 })
    return skills ?  JSON.parse(JSON.stringify(skills.skills)) : null
  }
   

  async getavailableTimeslot(id: string): Promise<TimeslotDTO[] | null> {
    const timeslot = await neighborModel.findOne(
      { _id: id },
      { availability: 1, _id: 0 }
    )

    return timeslot ? JSON.parse(JSON.stringify(timeslot.availability)) : null;
  }
  
  
  //************ add service location

  async updateLocation(id: string, updatedLocation: LocationDetailsDTO): Promise<locationDTO> {
    console.log(id)
    const neighbor = await neighborModel.findByIdAndUpdate(
        id,
        { availableLocation: updatedLocation, updatedAt: new Date() },
        { upsert: true ,new:true}
    ).exec();

    if (!neighbor || !neighbor.availableLocation) {
        throw new Error("Location update failed or not found");
    }

    const { city, radius, coordinates } = neighbor.availableLocation;

    return {
        city: city ?? "", // Ensure city is always a string
        radius: radius ?? 0, // Ensure radius is always a number
        coordinates: (coordinates?.coordinates?.length === 2 
            ? (coordinates.coordinates as [number, number]) 
            : [0, 0]) // Ensure coordinates are a tuple
    };
}

  
  // ********** Add Skills for neighbor
  async saveSkills(id: string, skill: SkillsDTO): Promise<SkillsDTO[]> {
    console.log('Repository: Saving skill for ID:', id);
    console.log('Repository: Skill data:', JSON.stringify(skill, null, 2));
  
    const skillData = {
      category: skill.category,
      subcategories: skill.subcategories, 
      hourlyRate: skill.hourlyRate, 
      description: skill.description
    };
  
    const neighbor = await neighborModel.findByIdAndUpdate(
      id,
      { $push: { skills: skillData } }, 
      { new: true, runValidators: true }
    ).exec();
  
    if (!neighbor) {
      console.log('Repository: Neighbor not found for ID:', id);
      throw new Error('Neighbor not found');
    }
  
    console.log('Repository: Updated skills:', JSON.stringify(neighbor.skills, null, 2));
    return neighbor.skills.map((s) => ({
      id:s._id.toString(),
      category: s.category,
      subcategories: s.subcategories,
      hourlyRate: s.hourlyRate,
      description: s.description
    }));  }
  

  //***************** schedule date and time************************** */
    async saveAvailabilty(
        id: string,
        availability: { date: Date; timeSlots: { startTime: number; endTime: number; }[]; }[]
      ): Promise<Neighbor> {
        console.log('Repository: Saving availability for ID:', id);
        console.log('Repository: Availability data:', JSON.stringify(availability, null, 2));
        
        const neighbor = await neighborModel.findByIdAndUpdate(
          id,
          { $set: { availability } },
          { new: true}
        ).exec();
    
        if (!neighbor) {
          console.log('Repository: No neighbor found with ID:', id);
          throw new Error('Neighbor not found');
        }
    
        // console.log('Repository: Updated availability:', JSON.stringify(neighbor.availability, null, 2));
        return neighbor as unknown as Neighbor; // Cast to Neighbor entity type
      }
    async findNeighborByEmail(email: string): Promise<Neighbor | null> {
        const neighbor = await neighborModel.findOne({ email })
        if (!neighbor) return null
        return new Neighbor(
            neighbor._id.toString(),
            neighbor.name,
            neighbor.email,
            neighbor.phone,
            neighbor.password
        )
    }
    async createNeighbor(neighbor: Neighbor): Promise<Neighbor> {
        const neighborDoc = await neighborModel.create({
            name: neighbor.name,
            email: neighbor.email,
            phone: neighbor.phone,
            password: neighbor.password,
        });
        
          return new Neighbor(
            neighborDoc._id.toString(),
            neighborDoc.name,
            neighborDoc.email,
            neighborDoc.phone,
            neighborDoc.password
          )
    }

}