import { User } from "../../../domain/entities/User"
import { UserRepository } from "../../../interface/repositories/userRepository"

export const updateuserAddress = async (id:string,address: any, userRepository: UserRepository): Promise<User | null> => {
    console.log(address)
    return await userRepository.updateAddress(id,address)
}