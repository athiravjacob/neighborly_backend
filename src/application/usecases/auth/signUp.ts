import { Neighbor } from "../../../domain/entities/Neighbor";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";
import { SignupDTO } from "../../../shared/types/SignupDTO";
import { AppError } from "../../../shared/utils/errors";


export class SignupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async executeUser(dto: SignupDTO): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(dto.email);
    if (existingUser) throw new AppError(409, "Email already exists"); // 409 Conflict is appropriate for duplicate resources

    const hashedPassword = await this.authService.hashPassword(dto.password);
    const user = new User(
      '',
      dto.name,
      dto.email,
      dto.phone,
      hashedPassword,
      
    );
    return this.userRepository.createUser(user);
  }

}