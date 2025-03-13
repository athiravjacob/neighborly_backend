import { IUserRepository } from "../../../domain/interface/repositories/userRepository"
import { User } from "../../../domain/entities/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {UserDTO}  from "../../../presentation/dtos/UserDTO"
const access_token_secret = process.env.JWT_SECRET||"secret_key"
const refresh_token_secret = process.env.REFRESH_SECRET || "secret_key"

export const login = async (
    email: string,
    password: string,
    userRepository: IUserRepository) :Promise<{accessToken:string,refreshToken:string,user:UserDTO}>=>
{
    const existingUser = await userRepository.findByEmail(email)
   
    if (!existingUser) {
        const error = new Error("Invalid Email or Password") as Error & { statusCode?: number }
        error.statusCode = 401
        throw error
    }

    const user :UserDTO= {
        id: existingUser?.id,
        name: existingUser?.name,
        email: existingUser?.email,
        profilePicUrl:existingUser?.profile_pic
    }
    const passwordValid = await bcrypt.compare(password, existingUser.password)
    if (!passwordValid) {
        const error = new Error("Invalid Email or Password") as Error & { statusCode?: number }
        error.statusCode = 401
        throw error
    }
    const accessToken = jwt.sign({ id: existingUser.id, name:existingUser.name}, access_token_secret, { expiresIn: "1h" })
    const refreshToken = jwt.sign({id:existingUser.id},refresh_token_secret,{expiresIn:"7d"})
    console.log(accessToken)
    return {accessToken,refreshToken,user:user}
    
    
}

// export const googleLogin = async(
//     googleId: string,
//     userRepository: UserRepository): Promise<{ accessToken: String, refreshToken: String, user: User }> => {
//         // const existingUser = await userRepository.findByGoogleId(googleId)
    
//     }