export interface IAuthService{
    hashPassword(password: string): Promise<string>
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    generateAccessToken(id: string, type: 'user' | 'neighbor'|'admin'): string;
    generateRefreshToken(id: string, type: 'user' | 'neighbor' | 'admin'): string;
    verifyRefreshToken(token: string): Promise<{ userId: string }>;
}