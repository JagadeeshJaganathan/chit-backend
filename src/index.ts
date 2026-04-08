import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import groupRoutes from "./routes/group.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/groups", groupRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Chit Fund API Running 🚀");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// ✅ PORT (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
