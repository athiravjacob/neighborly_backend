import { User } from "../../entities/User"

export interface IauthService{
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
    generateAccessToken(user: User): Promise<string>; 
    generateRefreshToken(user: User): Promise<string>;
}