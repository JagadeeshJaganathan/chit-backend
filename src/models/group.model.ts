import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: String,

  // ✅ total chit value
  totalAmount: {
    type: Number,
    required: true,
  },

  // ✅ number of months
  duration: {
    type: Number,
    required: true,
  },

  members: Number,

  memberLimit: {
    type: Number,
    default: 20,
  },
});
const Group = mongoose.model("Group", groupSchema);

export default Group;
