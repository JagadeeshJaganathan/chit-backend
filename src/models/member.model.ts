import mongoose, { Document } from "mongoose";

// ✅ Type definition
export interface IMember extends Document {
  name: string;
  phone: number;
  groupId: mongoose.Types.ObjectId;
}

// ✅ Schema
const memberSchema = new mongoose.Schema<IMember>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  { timestamps: true },
);

// ✅ Model
const Member = mongoose.model<IMember>("Member", memberSchema);

export default Member;
