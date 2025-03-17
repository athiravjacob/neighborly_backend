export class Neighbor {
    constructor(
      public id: string,
      public firstName: string,
      public lastName: string,
      public email: string,
      public phone: string,
      public password: string,
      public address?: {
        street: string;
        city: string;
        state: string;
        pincode: string;
        coordinates: { type: 'Point'; coordinates: [number, number] };
      },
      public skills: string[] = [],
      public aboutMe: string = '',
      public availableLocations: {
        city: string;
        radius: number;
        coordinates: { type: 'Point'; coordinates: [number, number] };
      }[] = [],
      public availability: {
        date: Date;
        isAvailable: boolean;
        timeSlots: { startTime: number; endTime: number }[];
      }[] = [],
      public isVerified: boolean = false,
      public idCardImage: string = '',
      public verificationStatus: 'pending' | 'approved' | 'rejected' = 'pending'
    ) {}
  }