// export class User {
   
//     constructor(
//       public id: string |undefined,
//       public name: string,
//       public email: string,
//       public phone: string,
//       public password?: string|null,
//       public dob?:Date,
//       public profilePicture?:string,
//       public googleId?:string,
//       public otp?: string,
//       public otpExpiresAt?: number,
//       public isBanned:boolean=false
//     ) {}
//   }





export class User {
  constructor(
    public id: string | undefined,
    public name: string,
    public email: string,
    public phone?: string | null, // Allow undefined or null to match schema
    public password?: string | null,
    public dob?: string | null, // Change to string to match schema
    public profilePicture?: string | null,
    public googleId?: string | null,
    public resetToken?: string | null, // Replace otp with resetToken
    public resetTokenExpiresAt?: number | null, // Replace otpExpiresAt
    public isBanned: boolean = false
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