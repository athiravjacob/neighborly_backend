import { UserRepository } from "../../../interface/repositories/userRepository";
import userModel from "../model/userModel";
import { User } from "../../../domain/entities/User";

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    
    const userDoc = await userModel.findOne({ email });
    if (!userDoc) return null;
    return userDoc
  }

  async findById(id: string): Promise<User | null>{
    const userDoc = await userModel.findOne({ _id: id });
    if (!userDoc) return null;
    return userDoc
  }

  async save(user: User): Promise<User> {
    const newUser = new userModel({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });

    const savedUser = await newUser.save();
    return savedUser
  }

  async updateBasic(userDetails: any): Promise<User> {
    try {
      if (!userDetails.id) throw new Error("User ID is required");
      console.log(userDetails);
  
      const updatedUser = await userModel.findByIdAndUpdate(
        userDetails.id,
        { profile_pic: userDetails.image, bio: userDetails.bio, DOB: userDetails.dob },
        { new: true } // Returns the updated document
      );
  
      if (!updatedUser) {
        throw new Error("User not found");
      }
  
      return updatedUser; // Return the updated user
    } catch (error) {
      throw new Error(`Error updating user: ${error}`); // Propagate the error
    }
  }

  async updateAddress(id:string,address: any): Promise<User> {
    try {
      
  
      const updatedUser = await userModel.findByIdAndUpdate(
        id, {
          address
        },
        { new: true } // Returns the updated document
      );
  
      if (!updatedUser) {
        throw new Error("User not found");
      }
  
      return updatedUser; // Return the updated user
    } catch (error) {
      throw new Error(`Error updating user: ${error}`); // Propagate the error
    }
  }
}
