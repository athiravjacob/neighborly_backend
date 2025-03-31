import { Schema, model } from 'mongoose';

const neighborSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  // address: {
  //   street: { type: String },
  //   city: { type: String },
  //   state: { type: String },
  //   zip: { type: String },
  //   coordinates: { type: { type: String, enum: ['Point'] }, coordinates: [Number] }
  // },
  // aboutMe: { type: String, default: '' },
  availableLocation: {
    city: { type: String },
    radius: { type: Number },
    coordinates: { 
      type: { type: String, enum: ['Point'], default: 'Point' }, 
      coordinates: { type: [Number], default: [0, 0] } // Default to [0, 0]
    }
  },

    skills: [{
    category: { type: String, required: true },
    subcategories: [{ type: String, required: true }],
    hourlyRate: { type: Number, required: true },
    description: { type: String, required: true }
  }],
  availability: [{
    date: { type: Date },
    timeSlots: [{ startTime: { type: Number }, endTime: { type: Number } }]
  }],
  // isVerified: { type: Boolean, default: false },
  // idCardImage: { type: String, default: '' },
  // verificationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

neighborSchema.index({'availableLocation.coordinates':'2dsphere'})

export const neighborModel = model('Neighbor', neighborSchema);