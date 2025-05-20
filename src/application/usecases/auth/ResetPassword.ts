import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";
import { AppError } from "../../../shared/utils/errors";

export class ResetPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
    private neighborRepository:INeighborRepository
  ) {
  }
  
  async execute(email: string, token: string, newPassword: string): Promise<void> {
      console.log("reset pass")
      const hashedPassword = await this.authService.hashPassword(newPassword);
      await this.userRepository.resetPassword(email, token, hashedPassword);
  }
  
  async changeCurrentPassword(id: string,type:string, currentPassword: string, newPassword:string): Promise<void>{
    console.log("change usecase")
    console.log(type)
    try {
      const existingPassword = type === 'user'
      ? await this.userRepository.fetchPassword(id)
      : await this.neighborRepository.fetchPassword(id);

      if (!existingPassword) throw new AppError(404, "'User or neighbor not found'")
      let password = currentPassword.trim()
      let hashedPassword = existingPassword
       const comparePassword = await this.authService.comparePassword(password, hashedPassword)
      if (!comparePassword) {
         throw new AppError(401, 'Current password is incorrect')
       }
      const newPasswordHashed = await this.authService.hashPassword(newPassword);
      if(type === 'user')
        await this.userRepository.updatePassword(id, newPasswordHashed)
      else 
      await this.neighborRepository.updatePassword(id, newPasswordHashed)

    } catch (error) {
      throw new AppError(400,`Error updating password:, ${(error as Error).message}`)
    }
  }
  }