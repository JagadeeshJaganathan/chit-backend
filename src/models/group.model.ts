import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: String,
    totalAmount: Number,
    duration: Number,
    durationUnit: String,
    memberLimit: Number,
    startDate: Date,
    totalMonths: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Group", groupSchema);
