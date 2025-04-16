import { errorMonitor } from "nodemailer/lib/xoauth2";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { userGeneralInfo } from "../../../shared/types/UserDTO";
import { errorResponse } from "../../../shared/utils/responseHandler";
import { AppError } from "../../../shared/utils/errors";

export class ProfileUsecase{
    constructor(
        private userRepository:IUserRepository
    ) { }
    
    async updateProfileInfo(id: string, profileDetails: userGeneralInfo): Promise<userGeneralInfo>{
        try {
            const profile = await this.userRepository.updateProfile(id, profileDetails)
             return profile
            
        } catch (error) {
            console.log(error)
            throw new AppError(400,`Failed to update profile: ${(error as Error).message}`)
        }
        
    } 

    async fetchProfileInfo(id: string): Promise<userGeneralInfo>{
        try {
            const profile = await this.userRepository.fetchProfile(id)
            return profile
        } catch (error) {
            throw new AppError(400,`Failed to fetch profile: ${(error as Error).message}`)

        }

    }
}