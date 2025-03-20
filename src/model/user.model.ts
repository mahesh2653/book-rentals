import mongoose, { Schema } from "mongoose";
import { IUser } from "../type";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
