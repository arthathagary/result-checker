import mongoose, { Document, Schema } from "mongoose";

const ResultSchema = new Schema(
  {
    certificateNo: {
      type: String,
      unique: true,
    },
    name: String,
    dob: Date,
    town: String,
    district: String,
    course: String,
    competition: String,
    courseDuration: Number,
    result: String,
    leactureName: [String],
    founderName: String,
    registrationNo: String,
    issueDate: Date,
    nic: String,
  },
  {
    timestamps: true,
  }
);

const ResultModel =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default ResultModel;
