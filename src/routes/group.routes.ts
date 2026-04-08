import express from "express";

const router = express.Router();

// 🔥 SIMPLE TEST
router.get("/", (req, res) => {
  res.json({ message: "Groups route working ✅" });
});

export default router;
