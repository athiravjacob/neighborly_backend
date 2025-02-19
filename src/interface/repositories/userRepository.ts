import { User } from "../../domain/entities/User";

export interface UserRepository{
    findByEmail(email: String): Promise<User | null>
    save(user:User):Promise<User>
}