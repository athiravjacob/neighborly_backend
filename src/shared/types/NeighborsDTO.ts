export interface NeighborInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  availableLocation: {
    city: string;
    radius: number;
    coordinates: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  skills: {
    category: string;
    subcategories: string[];
    hourlyRate: number;
    description: string;
  }[];
  availability: {
    date: Date;
    timeSlots: {
      startTime: number;
      endTime: number;
      note:"available"|"booked"
    }[];
  }[];
  isVerified: boolean
  idCardImage:string
  isBanned:boolean
}


export interface Availability {
  date: Date;
  timeSlots: {
    startTime: number;
    endTime: number;
    note:"available"|"booked"
  }[];
}[];

export interface TimeSlot{
  
    startTime: number;
    endTime: number;
    note:"available"|"booked"
  
}
