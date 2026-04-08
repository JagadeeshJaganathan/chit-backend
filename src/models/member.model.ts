import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: String,
    phone
    : Number,
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true },
);

export default mongoose.model("Member", memberSchema);
