import { UserRepository } from "../../../interface/repositories/userRepository";
import userModel from "../model/userModel";
import { User } from "../../../domain/entities/User";

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    
    const userDoc = await userModel.findOne({ email });
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
}
