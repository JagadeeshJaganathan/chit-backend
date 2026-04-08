import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import groupRoutes from "./routes/group.routes";
import Group from "./models/group.model";

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

// 🔥 AUTO CREATE GROUPS (SEED FUNCTION)
const seedGroups = async () => {
  try {
    const existingGroups = await Group.find();

    if (existingGroups.length === 0) {
      await Group.insertMany([
        {
          name: "Group A",
          amount: 100000,
          members: 20,
        },
        {
          name: "Group B",
          amount: 200000,
          members: 25,
        },
      ]);

      console.log("✅ Default groups created");
    } else {
      console.log("ℹ️ Groups already exist");
    }
  } catch (err) {
    console.log("Seed error:", err);
  }
};

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("DB Connected");

    await seedGroups(); // 🔥 KEY LINE
  })
  .catch((err) => console.log(err));

// ✅ PORT (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
