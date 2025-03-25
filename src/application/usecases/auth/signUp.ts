import { Neighbor } from "../../../domain/entities/Neighbor";
import { User } from "../../../domain/entities/User";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";
import { SignupDTO } from "../../../shared/types/SignupDTO";
import { AppError } from "../../../shared/utils/errors";


export class SignupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private neighborRepository:INeighborRepository,
    private authService: IAuthService,
  ) {}

  //*************user signup*************************/
  async executeUser(dto: SignupDTO): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(dto.email);
    if (existingUser) throw new AppError(409, "Email already exists ."); 

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
  //********************neighbor signup*********************/
  
  async executeNeighbor(dto: SignupDTO): Promise<Neighbor> {

    const existingNeighbor = await this.neighborRepository.findNeighborByEmail(dto.email);
    if (existingNeighbor) throw new AppError(409, "Email already exists ."); 
    const hashedPassword = await this.authService.hashPassword(dto.password);
    const neighbor = new Neighbor(
      '',
      dto.name,
      dto.email,
      dto.phone,
      hashedPassword,
      
    );
    return this.neighborRepository.createNeighbor(neighbor);
  }


}