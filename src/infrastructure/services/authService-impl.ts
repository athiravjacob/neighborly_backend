import { IAuthService } from "../../domain/interface/services/IAuthService";
import * as bcrypt from 'bcrypt';

export class AuthService implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}