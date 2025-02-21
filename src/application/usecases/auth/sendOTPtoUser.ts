import { storeOTP } from "../../../infrastructure/database/repositories/otpRepository"
import { sendEmail } from "../../../infrastructure/services/emailService"
import { generateOTP } from "../../../shared/utils/generateOTP"

export const sendOTPtoUser = async (email: string): Promise<void> => {
    const otp = generateOTP()
    await storeOTP(email, otp)
    
    const subject = "Your otp code"
    const text = `Your otp ${otp}. It is valid only for 3 minutes`
    
    await sendEmail(email,subject,text)
}