import mongoose, { Document } from "mongoose";

// ✅ DEFINE TYPE
export interface IGroup extends Document {
  name: string;
  totalAmount: number;
  duration: number;
  members: number;
  memberLimit: number;
  startDate: Date; // 🔥 ADD THIS
}

// ✅ SCHEMA
const groupSchema = new mongoose.Schema<IGroup>({
  name: String,

  totalAmount: {
    type: Number,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  members: Number,

  memberLimit: {
    type: Number,
    default: 20,
  },

  startDate: {
    type: Date,
    required: true,
  },
});

// ✅ MODEL
const Group = mongoose.model<IGroup>("Group", groupSchema);

export default Group;
