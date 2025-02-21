import { User } from "../../../domain/entities/User"
import { UserRepository } from '../../../interface/repositories/userRepository'
import bcrypt from 'bcrypt'
import { errorResponse } from "../../../shared/utils/responseHandler"

export const signUp = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    userRepository:UserRepository
):Promise<User> => {
    
    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
        const error = new Error("User already exists") as Error & { statusCode?: number };
        error.statusCode = 400;
        throw error;
       
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: User = {
        name,email,phone,password:hashedPassword
    }

    return await userRepository.save(newUser)

}