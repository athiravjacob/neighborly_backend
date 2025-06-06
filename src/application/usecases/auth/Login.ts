import { Message } from "../../../domain/entities/Message";
import { User } from "../../../domain/entities/User";
import { IAdminRepository } from "../../../domain/interface/repositories/IAdminRepository";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { ITokenRepository } from "../../../domain/interface/repositories/ITokenRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";
import { HttpStatus } from "../../../shared/constants/httpStatus";
import { Messages } from "../../../shared/constants/messages";
import { AuthResponseDTO } from "../../../shared/types/AuthResponseDTO";
import { LoginDTO } from "../../../shared/types/LoginDTO";
import { AppError } from "../../../shared/utils/errors";

export class LoginUsecase{
    constructor(
        private userRepository: IUserRepository,
        private neighborRepository:INeighborRepository,
        private adminRepository :IAdminRepository,
        private tokenRepository:ITokenRepository,
        private authService:IAuthService
    ) { }
    

    async executeUser(dto: LoginDTO): Promise<AuthResponseDTO> {
      const user = await this.userRepository.findUserByEmail(dto.email);
      console.log(user?.isBanned)
      if(user?.isBanned) throw new AppError(HttpStatus.FORBIDDEN,Messages.ERROR.BANNED)
      if (!user || !user.password || !(await this.authService.comparePassword(dto.password, user.password))) {
          throw new AppError(HttpStatus.UNAUTHORIZED, Messages.ERROR.INVALID_CREDENTIALS);
          
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
      throw new AppError(HttpStatus.UNAUTHORIZED, Messages.ERROR.INVALID_CREDENTIALS);
    }
  
    let user = await this.userRepository.findUserByGoogleId(uid);
    if(user?.isBanned) throw new AppError(HttpStatus.FORBIDDEN,Messages.ERROR.BANNED)

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
  //***************Neighbor Login *****************/
  async executeNeighbor(dto: LoginDTO): Promise<AuthResponseDTO> {
    const neighbor = await this.neighborRepository.findNeighborByEmail(dto.email);
    if(neighbor?.isBanned) throw new AppError(HttpStatus.FORBIDDEN,Messages.ERROR.BANNED)

    if (!neighbor || !(await this.authService.comparePassword(dto.password, neighbor.password))) {
      throw new AppError(HttpStatus.UNAUTHORIZED, Messages.ERROR.INVALID_CREDENTIALS);
      
    }
    // if(neighbor?.isBanned) throw new AppError(HttpStatus.FORBIDDEN,Messages.ERROR.BANNED)

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
  // ***************admin login

  async executeAdmin(dto: LoginDTO): Promise<AuthResponseDTO> {
    const admin = await this.adminRepository.fetchAdmin(dto.email, dto.password)
 
  const accessToken = this.authService.generateAccessToken(admin._id ,'admin');
  const refreshToken = this.authService.generateRefreshToken(admin._id ,'admin');

  await this.tokenRepository.storeRefreshToken(admin._id!, refreshToken,'admin');
    console.log("execute adminusecase")
  return {
    id:admin._id,
    name: admin.name,
    email: admin.email,
    accessToken,
    refreshToken,
    type:"admin"
  };
    
}
}