import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import groupRoutes from "./routes/group.routes";
import memberRoutes from "./routes/member.routes";
import paymentRoutes from "./routes/payment.routes";
import winnerRoutes from "./routes/winner.routes";
import dashboardRoutes from "./routes/dashboard.routes";

import Group from "./models/group.model";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/groups", groupRoutes);
app.use("/members", memberRoutes);
app.use("/payments", paymentRoutes);
app.use("/winners", winnerRoutes);
app.use("/dashboard", dashboardRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Chit Fund API Running 🚀");
});

/* ================= SEED GROUPS ================= */
const seedGroups = async () => {
  try {
    const count = await Group.countDocuments();

    // ✅ Only run once (no duplicates)
    if (count === 0) {
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

      console.log("✅ Default groups created");
    } else {
      console.log("ℹ️ Groups already exist — skipping seed");
    }
  } catch (err) {
    console.log("Seed error:", err);
  }
};

/* ================= DB CONNECT ================= */
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("DB Connected");

    await seedGroups(); // 🔥 runs only once safely
  })
  .catch((err) => console.log(err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
