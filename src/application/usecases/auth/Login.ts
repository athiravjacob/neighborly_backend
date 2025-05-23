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

  async loginWithGoogle(uid: string, email: string, name: string, phone: string): Promise<AuthResponseDTO> {
    // Validate inputs
    if (!uid || typeof uid !== 'string' || uid.trim() === '') {
      throw new Error('Invalid Google UID provided');
    }
    if (!email || !name) {
      throw new Error('Email and name are required');
    }
  
    let user = await this.userRepository.findUserByGoogleId(uid);
    let id = user?.id;
  
    if (!user) {
      user = new User(
        undefined, // id
        name,
        email,
        phone || undefined, // phone
        undefined, // password
        undefined, // dob
        undefined, // profilePicture
        uid, // googleId (correct position)
        undefined, // resetToken
        undefined, // resetTokenExpiresAt
        false // isBanned
      );
  
      const newUser = await this.userRepository.createUser(user);
      id = newUser.id;
    }
  
    const accessToken = this.authService.generateAccessToken(id!, 'user');
    const refreshToken = this.authService.generateRefreshToken(id!, 'user');
  
    await this.tokenRepository.storeRefreshToken(id!, refreshToken, 'user');
  
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
  

  async executeAdmin(dto: LoginDTO): Promise<AuthResponseDTO> {
    if (!dto.email ||(dto.email !== "admin@neighborly.com") || (dto.password !== "Admin123")) {
      throw new AppError(401, 'Invalid credentials');
      
  }
  let id = "Admin01"
  const accessToken = this.authService.generateAccessToken(id ,'admin');
  const refreshToken = this.authService.generateRefreshToken(id ,'admin');

  await this.tokenRepository.storeRefreshToken(id, refreshToken,'admin');

  return {
    id:id,
    name: "Admin",
    email: "admin@neighborly.com",
    accessToken,
    refreshToken,
    type:"admin"
  };
    
}
}