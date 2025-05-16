import { Neighbor } from "../../domain/entities/Neighbor";
import { INeighborRepository } from "../../domain/interface/repositories/INeighborRepository";
import { LocationDetailsDTO, locationDTO } from "../../shared/types/LocationDetailsDTO";
import { NeighborInfo } from "../../shared/types/NeighborsDTO";
import { SkillsDTO } from "../../shared/types/SkillsDTO";
import { TimeslotDTO } from "../../shared/types/TimeslotDTO";
import { AppError } from "../../shared/utils/errors";
import { neighborModel } from "../model/neigborModel";
import { UserModel } from "../model/userModel";

export class neighborRepository implements INeighborRepository{
  async ban_or_unban(id: string): Promise<Boolean> {
    const user = await neighborModel.findById(id);
  if (!user) {
    throw new Error("Invalid neighbor ID or neighbor does not exist");
  }

  // Toggle isBanned
  const updatedUser = await neighborModel.findByIdAndUpdate(
    id,
    { $set: { isBanned: !user.isBanned } },
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    throw new Error("Failed to update neighbor");
  }

  return updatedUser.isBanned;
  }

  async isBanned(id: string): Promise<Boolean> {
    const neighbor = await neighborModel.findById(id)
    if(!neighbor || !neighbor.isBanned) throw new Error("invalid neighbor id or neighbor doent exist")
    return neighbor.isBanned
  }
  

  async verifyNeighbor(id: string): Promise<void> {
    try {
      const neighbor = await neighborModel.findByIdAndUpdate(id, { isVerified: true, verificationStatus: 'approved' },{new:true})
      if(!neighbor) throw new AppError(400,"No neighbor found or neighbor Id invalid")
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        throw { statusCode: 500, message: error.message || "Error updatin verification status" }
        throw { statusCode: 500, message: "An unknown error occurred while checking service availablity" };
    }
    }
  }
  async fetchVerifyStatus(id: string): Promise<Boolean> {
    try {
      const neighbor = await neighborModel.findById(id)
      return neighbor?.isVerified!
    } catch (error) {
      if (error instanceof Error) {
        throw { statusCode: 500, message: error.message || "Error checking service availablity" };
    } else {
        throw { statusCode: 500, message: "An unknown error occurred while checking service availablity" };
    }
    }
  }
  
  async uploadId(id:string,idCardImage: string): Promise<Boolean> {
    try {
      const neighbor = await neighborModel.findByIdAndUpdate(id, { $set: { idCardImage: idCardImage } })
      return neighbor?.isVerified!
    } catch (error) {
      if (error instanceof Error) {
        throw { statusCode: 500, message: error.message || "Error checking service availablity" };
    } else {
        throw { statusCode: 500, message: "An unknown error occurred while checking service availablity" };
    }
    }
  }
  async fetchAllNeighbors(): Promise<[] | NeighborInfo[]> {
    const neighborList = await neighborModel.find().select('-password');
    return neighborList? JSON.parse(JSON.stringify(neighborList)) : []
  }

  //****************************** Check Service Availability *************************** */
  async checkServiceAvailability(city: string): Promise<Boolean> {
    try {
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
      throw new Error('Neighbor not found');
    }
  
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
       
        const neighbor = await neighborModel.findByIdAndUpdate(
          id,
          { $set: { availability } },
          { new: true}
        ).exec();
    
        if (!neighbor) {
          throw new Error('Neighbor not found');
        }
    
        return neighbor as unknown as Neighbor; // Cast to Neighbor entity type
  }
  
  //****************** Find Neighbor By Email ***********************/
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