import { IOtpRepository } from "../../../domain/interface/repositories/IOtpRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { EmailServiceImpl } from "../../../infrastructure/services/emailService-impl";
import { generateOTP } from "../../../shared/utils/generateOTP";

export class SendOtpUsecase{
    constructor(
        private otpRepository: IOtpRepository,
        private emailService: EmailServiceImpl)
    { }
   
    
    async execute(email: string): Promise<void>{
        const otp = generateOTP()
        console.log(otp)
        const expiresAt = Date.now() + 2 * 60 * 1000;
        await this.otpRepository.storeOTP(email, otp, expiresAt);
    
        await this.emailService.sendEmail(email,'Your Neighborly OTP',
        `Your OTP is ${otp}. It expires in 2 minutes.`)
    
    }

   
}

