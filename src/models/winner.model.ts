import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Winner", winnerSchema);
