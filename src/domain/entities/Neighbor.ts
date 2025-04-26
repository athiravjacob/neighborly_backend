export class Neighbor {
    constructor(
      public id: string|undefined,
      public name: string,
      public email: string,
      public phone: string,
      public password: string,
      // public address?: {
      //   street: string;
      //   city: string;
      //   state: string;
      //   pincode: string;
      //   coordinates: { type: 'Point'; coordinates: [number, number] };
      // },
      // public aboutMe: string = '',
      public availableLocations: {
        city: string;
        radius: number;
        coordinates: { type: 'Point'; coordinates: [number, number] };
      }= { city: '', radius: 0, coordinates: { type: 'Point', coordinates: [0, 0] } },
      public skills: {
        category: string;
        subcategories: string[];
        hourlyRate: number;
        description: string;
      }[] = [],
      public availability: {
        date: Date;
        timeSlots: { startTime: number; endTime: number }[];
      }[] = [],
      public isVerified: boolean = false,
      public idCardImage: string = '',
      public verificationStatus: 'pending' | 'approved' | 'rejected' = 'pending'
    ) {}
  }