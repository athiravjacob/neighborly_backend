import { RefreshToken } from "../../../shared/types/AuthResponseDTO";

export interface ITokenRepository{
    findRefreshToken(token: string): Promise<RefreshToken | null>;
    storeRefreshToken(userId: string, refreshToken: string, type: 'user' | 'admin' | 'neighbor'): Promise<void>;
    deleteRefreshToken(token:string):Promise<void>

}