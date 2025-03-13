import { IUserRepository } from "../../../domain/interface/repositories/userRepository";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class ResetPassword {
  private readonly accessTokenSecret: string;

  constructor(private userRepository: IUserRepository) {
    this.accessTokenSecret = process.env.JWT_SECRET || "default-secret";
  }

  async execute(token: string, newPassword: string): Promise<void> {
    const decoded = jwt.verify(token, this.accessTokenSecret) as { id: string };

    const user = await this.userRepository.findByResetToken(token);
    if (!user || user.id !== decoded.id || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
        const error = new Error("Invalid or expired reset token") as Error & { statusCode?: number };
        error.statusCode = 400;
        throw error;
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear token
    await this.userRepository.updatePassword(user.id!, hashedPassword);
  }
}