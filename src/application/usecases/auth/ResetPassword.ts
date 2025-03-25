import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";

export class ResetPasswordUseCase {
    constructor(
      private userRepository: IUserRepository,
      private authService: IAuthService
    ) {}
  
  async execute(email: string, token: string, newPassword: string): Promise<void> {
      console.log("reset pass")
      const hashedPassword = await this.authService.hashPassword(newPassword);
      await this.userRepository.resetPassword(email, token, hashedPassword);
    }
  }