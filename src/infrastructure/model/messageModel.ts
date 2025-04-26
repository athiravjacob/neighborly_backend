
import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'Neighbor', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, {
  timestamps: true
});

export const MessageModel = model('Message', messageSchema);
