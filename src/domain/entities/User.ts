export class User {
   
    constructor(
      public id: string |undefined,
      public name: string,
      public email: string,
      public password: string|null,
      public phone: string,
      public dob?:Date,
      public profilePicture?:string,
      public googleId?:string,
      public otp?: string,
      public otpExpiresAt?: number,
    ) {}
  }
























// export interface User{
//     id?: string;
//     name: string;
//     email: string;
//     phone: string;
//     profile_pic?: string
//     bio?: string
//     DOB?: Date
//     address?: {
//         street?: string,
//         city?: string,
//         state?: string,
//         pincode?:string
//     },
//     govtId?:string,
//     isVerified?:Boolean
//     password: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     resetToken?: string;
//     resetTokenExpiry?: Date;
//     role: 'user' | 'admin';
// }