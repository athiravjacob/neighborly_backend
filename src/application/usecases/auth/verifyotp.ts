import otpModel from "../../../infrastructure/model/otpModel"

export const verifyotp = async (email: string,otp:string): Promise<void> => {
    let Userotp = await otpModel.findOne({ email })
    if (!Userotp) {
        const error = new Error("OTP expired.Try resend OTP") as Error & { statusCode:number }
        error.statusCode = 400
        throw error
    }

    if (Userotp.otp !== otp) {
        const error = new Error("Invalid OTP .Try again") as Error & { statusCode:number }
        error.statusCode = 400
        throw error
    }

    
}