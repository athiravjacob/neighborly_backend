import { User } from "../../entities/User";


export interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
}