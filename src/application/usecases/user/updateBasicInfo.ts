import { MongoUserRepository } from "../../../infrastructure/database/repositories/userRepository"
import { UserRepository } from "../../../interface/repositories/userRepository"
import { User } from "../../../domain/entities/User";

const userRepository = new MongoUserRepository()

export const updateBasicInfo = async (userDetails: any, userRepository: UserRepository): Promise<User|null> => {
    console.log(userDetails)
    return await userRepository.updateBasic(userDetails)
}