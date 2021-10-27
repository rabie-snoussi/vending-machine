import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  role: string;
  deposit: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    deposit: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
