import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', userSchema);

export const db = { user: User };
