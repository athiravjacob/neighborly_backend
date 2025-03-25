import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { IEmailService } from "../../../domain/interface/services/emailServices";
import { EmailServiceImpl } from "../../../infrastructure/services/emailService-impl";
import { AppError } from "../../../shared/utils/errors";
import * as crypto from 'crypto';

export class forgotPasswordUsecase{
    constructor(
        private userRepository: IUserRepository,
        private emailService:IEmailService
    ) { }

    async execute(email:string):Promise<void>
    {
        let user = await this.userRepository.findUserByEmail(email)
        if (!user) {
            console.log("error")
            throw new AppError(400, "No user exist");
        }
        
        const resetToken = crypto.randomBytes(32).toString('hex')
        const expiresAt = Date.now() + 5 * 60 * 1000
        await this.userRepository.storeResetToken(email, resetToken, expiresAt)
        
        const link = `http://localhost:5173/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
        await this.emailService.sendEmail(
            email,
            'Reset Your Neighborly Password',
            `Click this link to reset your password: ${link}. It expires in 5 minutes.`
        )
    }
}