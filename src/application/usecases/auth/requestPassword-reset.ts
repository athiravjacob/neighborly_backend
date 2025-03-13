import { IUserRepository } from "../../../domain/interface/repositories/userRepository";
import { IEmailService } from "../../../domain/interface/services/emailServices";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class RequestPasswordReset {
  private readonly accessTokenSecret: string;

  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {
    this.accessTokenSecret = process.env.JWT_SECRET || "default-secret"; // Fallback if .env fails
  }

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return; // Silent fail

    const resetToken = jwt.sign({ id: user.id }, this.accessTokenSecret, { expiresIn: "1h" });
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.userRepository.updateResetToken(user.id!, resetToken, expiry);

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await this.emailService.sendEmail(
      email,
      "Password Reset Request",
      `Click to reset: ${resetLink}`
    );
  }
}