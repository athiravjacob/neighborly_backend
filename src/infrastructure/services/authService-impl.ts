import { IAuthService } from "../../domain/interface/services/IAuthService";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthService implements IAuthService {
  generateAccessToken(id: string, type: "user" | "neighbor" | "admin"): string {
    const JWT_SECRET = process.env.JWT_SECRET ||"JWTSECRETKEY"
    return jwt.sign({id,type},JWT_SECRET,{expiresIn:'15m'})
  }
  generateRefreshToken(id: string, type: "user" | "neighbor" | "admin"): string {
    console.log("generate referesh token")
    const RefreshSecret = process.env.REFRESH_SECRET ||"REFRESHSECRETKEY"
    return jwt.sign({ id, type }, RefreshSecret, { expiresIn: '7d' })
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}