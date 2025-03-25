export interface IOtpRepository {
    storeOTP: (email: string, otp: string, expiry?: number) => Promise<string>;
    getOTP: (email: string) => Promise<string | null>;
   
}