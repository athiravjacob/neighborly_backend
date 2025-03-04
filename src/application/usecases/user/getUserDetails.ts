import { User } from "../../../domain/entities/User";
import { MongoUserRepository } from "../../../infrastructure/database/repositories/userRepository";
import { UserRepository } from "../../../interface/repositories/userRepository";

const userRepository = new MongoUserRepository()

export const getUserDetails = async (id: string, userRepository: UserRepository): Promise<User> => {
    const user = await userRepository.findById(id)
    if (!user) {
        const error = new Error("User doesnt exist") as Error & { statusCode?: number };
        error.statusCode = 400;
        throw error;
    }
    return user
}