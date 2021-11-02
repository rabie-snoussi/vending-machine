import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  userAgent: string;
  createdAt: Date;
  updateAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userAgent: { type: String },
  },
  { timestamps: true, versionKey: false },
);

const Session = mongoose.model<SessionDocument>('Session', SessionSchema);

export default Session;
