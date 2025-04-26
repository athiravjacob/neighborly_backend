import { ITokenRepository } from "../../../domain/interface/repositories/ITokenRepository";
import { IAuthService } from "../../../domain/interface/services/IAuthService";

export class refreshTokenUsecase{
    constructor(
        private tokenRepository: ITokenRepository,
        private authService:IAuthService
    ) { }
    
    async execute(token: string): Promise<{ new_accessToken: string, new_refreshToken: string }>{
        const decoded = await this.authService.verifyRefreshToken(token)
        const storedToken = await this.tokenRepository.findRefreshToken(token);
        if (!storedToken) {
        throw new Error('Invalid refresh token');
        }

        if (storedToken.expiresAt < new Date()) {
            await this.tokenRepository.deleteRefreshToken(token);
            throw new Error('Refresh token expired');
        }
        if (storedToken.userId !== decoded.userId) {
            await this.tokenRepository.deleteRefreshToken(token);
            throw new Error('Token user mismatch');
          }
        await this.tokenRepository.deleteRefreshToken(token)
        let id = storedToken.userId as string
        let type = storedToken.type
        const new_accessToken = this.authService.generateAccessToken(id ,type);
        const new_refreshToken = this.authService.generateRefreshToken(id, type);
        await this.tokenRepository.storeRefreshToken(id, new_refreshToken, type);
        
        return {new_accessToken,new_refreshToken}


    }
}