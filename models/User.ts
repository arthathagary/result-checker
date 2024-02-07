import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  age: number;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

module.exports = UserModel;
