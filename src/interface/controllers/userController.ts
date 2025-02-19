import { Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/database/userRepository";
import { signUp } from "../../application/usecases/user/signUp";

const userRepository = new MongoUserRepository()
export const userSignUp = async(req:Request, res:Response) => {
    try {
        const { name, email,phone, password } = req.body
        const newUser = await signUp(name, email, phone, password, userRepository)
        
        res.status(200).json({message:"user signup successfull"})

    } catch (error) {
        res.status(500).json({message:"internal error"})

    }
}