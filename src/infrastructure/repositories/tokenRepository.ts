import { ITokenRepository } from "../../domain/interface/repositories/ITokenRepository";
import refreshTokenModel from "../model/refreshTokenModel";

export class tokenRepository implements ITokenRepository{
    async deleteRefreshToken(token: string): Promise<void> {
        await refreshTokenModel.deleteOne({ token: token });
      }
    
      async storeRefreshToken(id: string, refreshToken: string,type:string): Promise<void> {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        await refreshTokenModel.create({
          id,
          token: refreshToken,
          expiresAt,
          type
        });
      }
    
}