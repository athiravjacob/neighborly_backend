import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { HttpStatus } from "../../../shared/constants/httpStatus";
import { Messages } from "../../../shared/constants/messages";
import { AppError } from "../../../shared/utils/errors";


export class CheckUserBanStatusUsecase {
  constructor(
    private userRepository: IUserRepository,
    private neighborRepository: INeighborRepository
  ) {}

  async execute(userId: string, userType: 'user' | 'neighbor'): Promise<void> {
    let banned;
    if (userType === 'user') {
      banned = await this.userRepository.isBanned(userId);
    
      if (banned) {
        throw new AppError(HttpStatus.FORBIDDEN, Messages.ERROR.BANNED);
      }
    } else if (userType === 'neighbor') {
      banned = await this.neighborRepository.isBanned(userId);
      
      if (banned) {
        throw new AppError(HttpStatus.FORBIDDEN, Messages.ERROR.BANNED);
      }
    }
  }
}