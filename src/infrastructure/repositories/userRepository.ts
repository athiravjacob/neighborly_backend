import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { UserModel } from "../model/userModel";
import { User } from "../../domain/entities/User";
import { AppError } from "../../shared/utils/errors";

export class UserRepository implements IUserRepository {
  

  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    try {
      const userDoc = await UserModel.findOne({ email }).exec();
      if (!userDoc || !userDoc.resetToken || !userDoc.resetTokenExpiresAt) {
        console.log("err")
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

  async storeResetToken(email: string, token: string, expiresAt: number): Promise<void> {
    try {
      await UserModel.updateOne({ email },
        { $set: { resetToken: token, resetTokenExpiresAt: expiresAt } })
    } catch (error) {
      throw new AppError(400,`Failed to store reset token: ${(error as Error).message}`)
    }
  }

  

  async findUserByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).exec();
    if (!userDoc) return null;
    console.log(userDoc)
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

