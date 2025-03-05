import { User } from "../../domain/entities/User";

export interface UserRepository{
    findByEmail(email: string): Promise<User | null>
    findById(id:string):Promise<User|null>
    save(user: User): Promise<User>
    updateBasic(userDetails: any): Promise<User | null>
    updateAddress(id:string,address: any): Promise<User | null>

}