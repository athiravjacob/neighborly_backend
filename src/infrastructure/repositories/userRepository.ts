import { IUserRepository } from "../../domain/interface/repositories/userRepository";
import { User } from "../../domain/entities/User";
import userModel from "../../infrastructure/model/userModel";

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await userModel.findOne({ email });
    if (!userDoc) return null;
    return this.mapToUser(userDoc);
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await userModel.findOne({ _id: id });
    if (!userDoc) return null;
    return this.mapToUser(userDoc);
  }

  async save(user: User): Promise<User> {
    const newUser = new userModel({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });
    const savedUser = await newUser.save();
    return this.mapToUser(savedUser);
  }

  async updateBasic(userDetails: any): Promise<User> {
    if (!userDetails.id) throw new Error("User ID is required");
    const updatedUser = await userModel.findByIdAndUpdate(
      userDetails.id,
      { profile_pic: userDetails.image, bio: userDetails.bio, DOB: userDetails.dob },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found");
    return this.mapToUser(updatedUser);
  }

  async updateAddress(id: string, address: any): Promise<User> {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { address },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found");
    return this.mapToUser(updatedUser);
  }

  async updateResetToken(id: string, token: string, expiry: Date): Promise<void> {
    await userModel.updateOne({ _id: id }, { resetToken: token, resetTokenExpiry: expiry });
  }

  async findByResetToken(token: string): Promise<User | null> {
    const userDoc = await userModel.findOne({ resetToken: token });
    if (!userDoc) return null;
    return this.mapToUser(userDoc);
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await userModel.updateOne(
      { _id: id },
      { password, resetToken: null, resetTokenExpiry: null }
    );
  }

  private mapToUser(doc: any): User {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      profile_pic: doc.profile_pic,
      bio: doc.bio,
      DOB: doc.DOB,
      address: doc.address,
      isVerified: doc.isVerified,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      resetToken: doc.resetToken,
      resetTokenExpiry: doc.resetTokenExpiry,
    };
  }
}