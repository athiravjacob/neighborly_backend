import otpModel from "../model/otpModel"
export const storeOTP = async (email: string, otp: string, expiry: number = 180): Promise<void> => {
    const expiresAt = new Date(Date.now() + expiry * 1000)
    await otpModel.create({email,otp,expiresAt})
}

export const getOTP = async (email: string): Promise<string | null> => {
    const otpDoc = await otpModel.findOne({ email })
    return otpDoc? otpDoc.otp :null
}