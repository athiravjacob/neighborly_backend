import { userGeneralInfo } from "../../../shared/types/UserDTO";
import { User } from "../../entities/User";


export interface IUserRepository {
  fetchAllUsers():Promise<User[]|[]>

  fetchProfile(userId: string): Promise<userGeneralInfo>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByGoogleId(uid:string):Promise<User|null>
  createUser(user: User): Promise<User>;
  storeResetToken(email: string, token: string, expiresAt: number): Promise<void>
  resetPassword(email: string, token: string, newPassword: string): Promise<void>; 
  updateProfile(userId:string,profileDetails:userGeneralInfo):Promise<userGeneralInfo>
  fetchPassword(userId: string): Promise<string>
  updatePassword(userId: string, newPasswordHashed: string): Promise<void>
  
  ban_or_unban(userId: string): Promise<Boolean>
  isBanned(userId:string):Promise<Boolean>
}