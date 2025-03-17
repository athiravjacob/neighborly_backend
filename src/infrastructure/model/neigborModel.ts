import { Schema, model } from 'mongoose';

const neighborSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    coordinates: { type: { type: String, enum: ['Point'] }, coordinates: [Number] }
  },
  skills: { type: [String], default: [] },
  aboutMe: { type: String, default: '' },
  availableLocations: [{
    city: { type: String },
    radius: { type: Number },
    coordinates: { type: { type: String, enum: ['Point'] }, coordinates: [Number] }
  }],
  availability: [{
    date: { type: Date },
    isAvailable: { type: Boolean },
    timeSlots: [{ startTime: { type: Number }, endTime: { type: Number } }]
  }],
  isVerified: { type: Boolean, default: false },
  idCardImage: { type: String, default: '' },
  verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
},{ timestamps: true });

export const NeighborModel = model('Neighbor', neighborSchema);