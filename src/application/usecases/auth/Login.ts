import { User } from "../../../domain/entities/User";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { ITokenRepository } from "../../../domain/interface/repositories/ITokenRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";
import { AuthResponseDTO } from "../../../shared/types/AuthResponseDTO";
import { LoginDTO } from "../../../shared/types/LoginDTO";
import { AppError } from "../../../shared/utils/errors";

export class LoginUsecase{
    constructor(
        private userRepository: IUserRepository,
        private neighborRepository:INeighborRepository,
        private tokenRepository:ITokenRepository,
        private authService:IAuthService
    ) { }
    

    async executeUser(dto: LoginDTO): Promise<AuthResponseDTO> {
      const user = await this.userRepository.findUserByEmail(dto.email);
      console.log(user,"login")
      if (!user || !user.password || !(await this.authService.comparePassword(dto.password, user.password))) {
          throw new AppError(401, 'Invalid credentials');
          
      }
      let id = user.id as string
      const accessToken = this.authService.generateAccessToken(id ,'user');
      const refreshToken = this.authService.generateRefreshToken(id ,'user');

      await this.tokenRepository.storeRefreshToken(id, refreshToken,'user');

      return {
        id:id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
        type:"user"
      };
        
  }

  async loginWithGoogle(uid: string, email: string,name: string,phone:string): Promise<AuthResponseDTO> {
    let user = await this.userRepository.findUserByGoogleId(uid);
    let id = user?.id
    if (!user) {
      user = new User(
        undefined,  
        name,
        email,
        "",  
        phone, 
        undefined,
        uid,
        undefined,
        undefined,
      );
      
      const newUser = await this.userRepository.createUser(user);
      
       id = newUser.id;
    } 
    
  
    
    const accessToken = this.authService.generateAccessToken(id!, 'user');
    const refreshToken = this.authService.generateRefreshToken(id!, 'user');
  
    // Store the refresh token in the token repository
    await this.tokenRepository.storeRefreshToken(id!, refreshToken, 'user');
  
    // Return the response object
    return {
      id: id!,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
      type: 'user',
    };
  }
  
  

  async executeNeighbor(dto: LoginDTO): Promise<AuthResponseDTO> {
    const neighbor = await this.neighborRepository.findNeighborByEmail(dto.email);
    if (!neighbor || !(await this.authService.comparePassword(dto.password, neighbor.password))) {
      throw new AppError(401, 'Invalid credentials');
      
  }
  let id = neighbor.id as string
  const accessToken = this.authService.generateAccessToken(id ,'neighbor');
  const refreshToken = this.authService.generateRefreshToken(id ,'neighbor');

  await this.tokenRepository.storeRefreshToken(id, refreshToken,'neighbor');

  return {
    id:id,
    name: neighbor.name,
    email: neighbor.email,
    accessToken,
    refreshToken,
    type:"neighbor"
  };
    
}
}