import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import groupRoutes from "./routes/group.routes";
import memberRoutes from "./routes/member.routes";
import paymentRoutes from "./routes/payment.routes";
import winnerRoutes from "./routes/winner.routes";
import dashboardRoutes from "./routes/dashboard.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/groups", groupRoutes);
app.use("/members", memberRoutes);
app.use("/payments", paymentRoutes);
app.use("/winners", winnerRoutes);
app.use("/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Chit Fund API Running 🚀");
});

// ✅ CONNECT TO ATLAS (NOT LOCAL)
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// ✅ USE RENDER PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
