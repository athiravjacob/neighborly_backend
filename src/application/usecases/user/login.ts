import { UserRepository } from "../../../interface/repositories/userRepository"
import { User } from "../../../domain/entities/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const access_token_secret = process.env.JWT_SECRET||"secret_key"
const refresh_token_secret = process.env.REFRESH_SECRET || "secret_key"

export const login = async (
    email: string,
    password: string,
    userRepository: UserRepository) :Promise<{accessToken:string,refreshToken:string,user:User}>=>
{
    const existingUser = await userRepository.findByEmail(email)
    if (!existingUser) {
        const error = new Error("Invalid Email or Password") as Error & { statusCode?: number }
        error.statusCode = 401
        throw error
    }

    const passwordValid = await bcrypt.compare(password, existingUser.password)
    if (!passwordValid) {
        const error = new Error("Invalid Email or Password") as Error & { statusCode?: number }
        error.statusCode = 401
        throw error
    }
    const accessToken = jwt.sign({ id: existingUser.id, role: existingUser.email }, access_token_secret, { expiresIn: "1h" })
    const refreshToken = jwt.sign({id:existingUser.id},refresh_token_secret,{expiresIn:"1d"})

    return {accessToken,refreshToken,user:existingUser}
    
    
}