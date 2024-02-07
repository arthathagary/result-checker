import mongoose, { Document, Schema } from "mongoose";

const ResultSchema = new Schema(
  {
    name: String,
    dob: Date,
    town: String,
    district: String,
    courseName: String,
    courseDuration: Number,
  },
  {
    timestamps: true,
  }
);

const ResultModel =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default ResultModel;
