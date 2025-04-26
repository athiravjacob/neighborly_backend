import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";
import { AppError } from "../../../shared/utils/errors";

export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {
  }
  
  async execute(email: string, token: string, newPassword: string): Promise<void> {
      console.log("reset pass")
      const hashedPassword = await this.authService.hashPassword(newPassword);
      await this.userRepository.resetPassword(email, token, hashedPassword);
  }
  
  async changeCurrentPassword(id: string,type:string, currentPassword: string, newPassword:string): Promise<void>{
    let existingPasssword
    console.log("change usecase")
    console.log(type)
    try {
      if (type === 'user') {
        existingPasssword = await this.userRepository.fetchPassword(id)
       } 
      if (!existingPasssword) throw new AppError(400, "This user doesnt have password")
      let password = currentPassword.trim()
      let hashedPassword = existingPasssword
       const comparePassword = await this.authService.comparePassword(password, hashedPassword)
      if (!comparePassword) {
         throw new AppError(400,"your current Password doesn't match")
       }
       const newPasswordHashed = await this.authService.hashPassword(newPassword);
       await this.userRepository.updatePassword(id,newPasswordHashed)
    } catch (error) {
      throw new AppError(400,`Error updating password:, ${(error as Error).message}`)
    }
  }
  }