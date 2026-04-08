import express from "express";
import Group from "../models/group.model";

const router = express.Router();

// ✅ GET all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    console.log("GROUP ERROR:", err);
    res.status(500).json({ error: err });
  }
});

// ✅ CREATE group
router.post("/", async (req, res) => {
  try {
    const { name, amount, members } = req.body;

    const newGroup = new Group({
      name,
      amount,
      members,
    });

    await newGroup.save();
    res.json(newGroup);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ error: err });
  }
});

export default router;
