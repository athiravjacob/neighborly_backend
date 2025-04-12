import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";

export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {
  }
  async checkPassword(currentpassword:string,newPassword:string): Promise < void> {
    // const user = await this.userRepository.findUserByEmail(dto.email);
    // console.log(user,"login")
    // if (!user || !user.password || !(await this.authService.comparePassword(dto.password, user.password))) {
    //     console.log("some prob")
    //     throw new AppError(401, 'Invalid credentials');
        
    // } 
  }
  async execute(email: string, token: string, newPassword: string): Promise<void> {
      console.log("reset pass")
      const hashedPassword = await this.authService.hashPassword(newPassword);
      await this.userRepository.resetPassword(email, token, hashedPassword);
    }
  }