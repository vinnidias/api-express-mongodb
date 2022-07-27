import mongoose from "mongoose";

type IUser = {
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: String
});

export const User = mongoose.model<IUser>("User", UserSchema)