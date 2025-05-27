import { ITokenRepository } from "../../domain/interface/repositories/ITokenRepository";
import { RefreshToken } from "../../shared/types/AuthResponseDTO";
import refreshTokenModel from "../model/refreshTokenModel";

export class tokenRepository implements ITokenRepository{
  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const existingToken = await refreshTokenModel.findOne({ token: token })
    return existingToken ? JSON.parse(JSON.stringify(existingToken)):null
      
  }
    async deleteRefreshToken(token: string): Promise<void> {
        await refreshTokenModel.deleteOne({ token: token });
      }
    
      async storeRefreshToken(userId: string, refreshToken: string,type:string): Promise<void> {
       try {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
        await refreshTokenModel.create({
          userId,
          token: refreshToken,
          expiresAt,
          type
        });
       } catch (error) {
        console.log(error)
       }
      }
    
}