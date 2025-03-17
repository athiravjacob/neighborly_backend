export interface IAuthService{
    hashPassword(password: string): Promise<string>
    // comparePassword(password: string, hash: string): Promise<boolean>;
    // generateAccessToken(id: string, type: 'user' | 'neighbor'): string;
    // generateRefreshToken(id: string, type: 'user' | 'neighbor'): string;
}