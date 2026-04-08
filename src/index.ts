import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import groupRoutes from "./routes/group.routes";
import memberRoutes from "./routes/member.routes";
import paymentRoutes from "./routes/payment.routes";
import winnerRoutes from "./routes/winner.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/groups", groupRoutes);
app.use("/members", memberRoutes);
app.use("/payments", paymentRoutes);
app.use("/winners", winnerRoutes);
app.use("/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.send("Chit Fund API Running 🚀");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/chitfund")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
