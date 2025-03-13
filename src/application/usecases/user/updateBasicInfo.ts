import { MongoUserRepository } from "../../../infrastructure/repositories/userRepository"
import { IUserRepository } from "../../../domain/interface/repositories/userRepository"
import { User } from "../../../domain/entities/User";

const userRepository = new MongoUserRepository()

export const updateBasicInfo = async (userDetails: any, userRepository: IUserRepository): Promise<User|null> => {
    console.log(userDetails)
    return await userRepository.updateBasic(userDetails)
}