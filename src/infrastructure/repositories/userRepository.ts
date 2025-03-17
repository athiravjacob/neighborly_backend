import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { UserModel } from "../model/userModel";
import { User } from "../../domain/entities/User";


export class UserRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).exec();
    if (!userDoc) return null;
    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone,
      userDoc.password
    );
  }

  async createUser(user: User): Promise<User> {
    const userDoc = await UserModel.create({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });
    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone,
      userDoc.password
    )
  }
}

