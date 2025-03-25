import otpModel from "../model/otpModel";

export class OtpRepository {
    async storeOTP(email: string, otp: string, expiry: number = 120): Promise<string> {
        const expiresAt = new Date(Date.now() + expiry * 1000);

        const existingOtp = await otpModel.findOne({ email });
        if (existingOtp) {
            await otpModel.updateOne(
                { email },
                { otp, expiresAt }
            );
        } else {
            await otpModel.create({ email, otp, expiresAt });
        }

        return otp;
    }

    async getOTP(email: string): Promise<string | null> {
        const otpDoc = await otpModel.findOne({ email });
        if (!otpDoc || otpDoc.expiresAt < new Date()) {
            return null;
        }
        return otpDoc.otp;
    }

    
}

export default OtpRepository;