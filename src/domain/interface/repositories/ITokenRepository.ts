export interface ITokenRepository{
    storeRefreshToken(userId: string, refreshToken: string, type: 'user' | 'admin' | 'neighbor'): Promise<void>;
    deleteRefreshToken(token:string):Promise<void>

}