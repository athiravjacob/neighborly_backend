import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { UserModel } from "../model/userModel";
import { User } from "../../domain/entities/User";
import { AppError } from "../../shared/utils/errors";
import { userGeneralInfo } from "../../shared/types/UserDTO";

export class UserRepository implements IUserRepository {
  async ban_or_unban(id: string): Promise<Boolean> {
    const user = await UserModel.findById(id);
  if (!user) {
    throw new Error("Invalid user ID or user does not exist");
  }

  // Toggle isBanned
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { $set: { isBanned: !user.isBanned } },
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    throw new Error("Failed to update user");
  }

  return updatedUser.isBanned;
  }
  
  async isBanned(id: string): Promise<Boolean> {
    const user = await UserModel.findById(id)
    if(!user || !user.isBanned) throw new Error("invalid user id or user doent exist")
    return user.isBanned
  }
  async fetchAllUsers(): Promise<[] | User[]> {
    const userList = await UserModel.find().select('-password');
    return userList ? JSON.parse(JSON.stringify(userList )) : []
  }
  async fetchPassword(id: string): Promise<string> {
    const user = await UserModel.findOne({ _id: id }, { _id: 0, password: 1 })
    if (!user?.password) {
      throw new AppError(400, "No password found for user");
  }
    return user.password;
  }
  async updatePassword(id: string, newPasswordHashed: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { $set: { password: newPasswordHashed } },{ new: true } )
    
  }
  async fetchProfile(id: string): Promise<userGeneralInfo> {
    try {
      const user = await UserModel.findById(id)
      if (!user) throw new AppError(400, "No user exist")
      const profile: userGeneralInfo = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        dob: user.dob ? new Date(user.dob) : undefined,
        profilePicture: user.profilePicture || undefined,
        isBanned:user.isBanned


      };
      return profile 
    } catch (error) {
      throw new AppError(400,`Failed to fetch profile data: ${(error as Error).message}`);

    }
  }

  //**************************** Update user profile **************************
  async updateProfile(id: string, profileDetails: userGeneralInfo): Promise<userGeneralInfo> {
    try {
      const updatedDetails:any = {}
      if (profileDetails.phone) updatedDetails.phone = profileDetails.phone;
      if (profileDetails.dob) updatedDetails.dob = profileDetails.dob;
      if (profileDetails.profilePicture) updatedDetails.profilePicture = profileDetails.profilePicture;
      const updatedProfile = await UserModel.findByIdAndUpdate({ _id: id }, { $set: updatedDetails }, { new: true }) 
      return JSON.parse(JSON.stringify(updatedProfile))
    } catch (error) {
      throw new AppError(400,`Failed to update profile: ${(error as Error).message}`);

    }
  }

//**************** Find User By Google ID ************************** */
  async findUserByGoogleId(uid: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ googleId: uid })
    if (!userDoc) return null;
    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone || " ",
      userDoc.password || " ",

    );
  }
  
  //******************** Reset Password ********************** */


  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    try {
      const userDoc = await UserModel.findOne({ email }).exec();
      if (!userDoc || !userDoc.resetToken || !userDoc.resetTokenExpiresAt) {
        throw new AppError(400,'Invalid or expired reset token');
      }

      if (userDoc.resetToken !== token || userDoc.resetTokenExpiresAt < Date.now()) {
        throw new AppError(400,'Invalid or expired reset token');
      }

      await UserModel.updateOne(
        { email },
        {
          $set: { password: newPassword },
          $unset: { resetToken: '', resetTokenExpiresAt: '' },
        }
      );
    } catch (error) {
      throw new AppError(400,`Failed to reset password: ${(error as Error).message}`);
    }
  }

  //**************************Store Reset Token ********************* */
  async storeResetToken(email: string, token: string, expiresAt: number): Promise<void> {
    try {
      await UserModel.updateOne({ email },
        { $set: { resetToken: token, resetTokenExpiresAt: expiresAt } })
    } catch (error) {
      throw new AppError(400,`Failed to store reset token: ${(error as Error).message}`)
    }
  }

  //****************************Find User by email ********************** */

  async findUserByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).exec();
    if (!userDoc) return null;
    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone || "",
      userDoc.password || "",


    );
  }

  // ************************ Create New User********************************
  async createUser(user: User): Promise<User> {
    const userDoc = await UserModel.create({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password ||null,
      googleId:user.googleId || null
    });
    return new User(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone || "",
      userDoc.password||"",
    )
  }


  
}

