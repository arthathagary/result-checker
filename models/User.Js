import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = models.User || mongoose.model("User", userSchema);
export default UserModel;
