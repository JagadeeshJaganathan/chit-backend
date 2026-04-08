import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
