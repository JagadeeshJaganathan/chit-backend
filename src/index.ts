import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import groupRoutes from "./routes/group.routes";
import memberRoutes from "./routes/member.routes"; // ✅ ADD
import paymentRoutes from "./routes/payment.routes"; // ✅ ADD
import winnerRoutes from "./routes/winner.routes"; // ✅ ADD
import dashboardRoutes from "./routes/dashboard.routes"; // ✅ ADD

import Group from "./models/group.model";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/groups", groupRoutes);
app.use("/members", memberRoutes); // 🔥 FIX
app.use("/payments", paymentRoutes); // 🔥 FIX
app.use("/winners", winnerRoutes); // 🔥 FIX
app.use("/dashboard", dashboardRoutes); // 🔥 FIX

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Chit Fund API Running 🚀");
});

// 🔥 AUTO CREATE GROUPS
const seedGroups = async () => {
  try {
    // 🔥 DELETE OLD DATA (TEMP)

    await Group.insertMany([
      {
        name: "Group A",
        totalAmount: 300000,
        duration: 10,
        members: 10,
        memberLimit: 20,
      },
      {
        name: "Group B",
        totalAmount: 300000,
        duration: 10,
        members: 10,
        memberLimit: 25,
      },
    ]);

    console.log("✅ Groups reset + created");
  } catch (err) {
    console.log(err);
  }
};

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("DB Connected");
    await seedGroups();
  })
  .catch((err) => console.log(err));

// ✅ PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
