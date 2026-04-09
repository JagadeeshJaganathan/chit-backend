import mongoose, { Document } from "mongoose";

// ✅ DEFINE TYPE
export interface IGroup extends Document {
  name: string;
  totalAmount: number;
  duration: number;
  members: number;
  memberLimit: number;
  startDate: Date;
  isEnded: boolean;
  endedAt?: Date | null;
}

const getDefaultStartDate = () => new Date("2025-12-01T00:00:00.000Z");

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
    default: getDefaultStartDate,
  },
  isEnded: {
    type: Boolean,
    default: false,
  },
  endedAt: {
    type: Date,
    default: null,
  },
});

// ✅ MODEL
const Group = mongoose.model<IGroup>("Group", groupSchema);

export default Group;
