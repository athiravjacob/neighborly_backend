export interface NeighborInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  availableLocations: {
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
    }[];
  }[];
  isBanned:boolean
}



