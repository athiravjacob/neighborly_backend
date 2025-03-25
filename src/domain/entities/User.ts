export class User {
    private _id(_id: any, arg1: string) {
      throw new Error("Method not implemented.");
    }
    constructor(
      public id: string |undefined,
      public name: string,
      public email: string,
      public phone: string,
      public password: string,
      otp?: string,
      otpExpiresAt?: number,
      // public address?: {
      //   street: string;
      //   city: string;
      //   state: string;
      //   pincode: string;
      //   coordinates: { type: 'Point'; coordinates: [number, number] };
      // }
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