import { IOtpRepository } from "../../../domain/interface/repositories/IOtpRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { AppError } from "../../../shared/utils/errors";

export class verifyOtpUseCase{
    constructor(
        private otpRepository: IOtpRepository,
    ) { }
    
    async execute(email: string, otp: string): Promise<void>{
        const storedOtp = await this.otpRepository.getOTP(email)
        if (!storedOtp) {
            throw new AppError(404,'no OTP found for this email')
        }
        
        if (storedOtp !== otp) {
            throw new AppError(400,"invalid OTP")
        }
        console.log(storedOtp)

    }
}