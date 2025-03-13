export interface User{
    id?: string;
    name: string;
    email: string;
    phone: string;
    profile_pic?: string
    bio?: string
    DOB?: Date
    address?: {
        street?: string,
        city?: string,
        state?: string,
        pincode?:string
    },
    isVerified?:Boolean
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    resetToken?: string;
    resetTokenExpiry?:Date
}