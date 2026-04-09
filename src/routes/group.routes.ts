import express from "express";
import Group from "../models/group.model";

const router = express.Router();

// ✅ GET all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err: any) {
    console.log("GROUP ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;



