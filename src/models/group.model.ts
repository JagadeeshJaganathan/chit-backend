import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  members: Number,
});

export default mongoose.model("Group", groupSchema);