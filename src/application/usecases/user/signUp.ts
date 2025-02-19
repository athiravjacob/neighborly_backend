import { User } from "../../../domain/entities/User"
import {UserRepository} from '../../../interface/repositories/userRepository'
export const signUp = async (
    name: String,
    email: String,
    phone: String,
    password: String,
    userRepository:UserRepository
):Promise<User> => {
    
    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
        console.log("Email already exist")
    }

    const newUser: User = {
        name,email,phone,password
    }

    return await userRepository.save(newUser)

}