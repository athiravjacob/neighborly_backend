import { IAuthService } from "../../domain/interface/services/IAuthService";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthService implements IAuthService {
  async verifyRefreshToken(token: string): Promise<{ userId: string; }> {
    try {
      const RefreshSecret = process.env.REFRESH_SECRET ||"REFRESHSECRETKEY"

      const decoded = jwt.verify(token, RefreshSecret);
      if (!decoded || typeof decoded !== 'object' || !decoded.id) {
        throw new Error('Invalid token payload');
      }
      return { userId: decoded.id };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
  generateAccessToken(id: string, type: "user" | "neighbor" | "admin"): string {
    const JWT_SECRET = process.env.JWT_SECRET ||"JWTSECRETKEY"
    return jwt.sign({id,type},JWT_SECRET,{expiresIn:'20m'})
  }
  generateRefreshToken(id: string, type: "user" | "neighbor" | "admin"): string {
    const RefreshSecret = process.env.REFRESH_SECRET ||"REFRESHSECRETKEY"
    return jwt.sign({ id, type }, RefreshSecret, { expiresIn: '7d' })
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const passcompare =await bcrypt.compare(password, hashedPassword);
    return passcompare
  }
}