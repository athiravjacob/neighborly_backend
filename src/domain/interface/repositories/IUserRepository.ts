import { userGeneralInfo } from "../../../shared/types/UserDTO";
import { User } from "../../entities/User";


export interface IUserRepository {
  fetchProfile(id: string): Promise<userGeneralInfo>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByGoogleId(uid:string):Promise<User|null>
  createUser(user: User): Promise<User>;
  storeResetToken(email: string, token: string, expiresAt: number): Promise<void>
  resetPassword(email: string, token: string, newPassword: string): Promise<void>; 
  updateProfile(id:string,profileDetails:userGeneralInfo):Promise<userGeneralInfo>
 
}