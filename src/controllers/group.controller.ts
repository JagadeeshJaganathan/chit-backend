import { Request, Response } from "express";
import Group from "../models/group.model";

// ✅ CREATE GROUP
export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, totalAmount, memberLimit, duration, totalMonths } = req.body;
    const groupDuration = duration ?? totalMonths;

    // 🔍 Validation (recommended)
    if (!name || !totalAmount || !memberLimit || !groupDuration) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const group = await Group.create({
      name,
      totalAmount,
      memberLimit,
      duration: groupDuration,
    });

    res.json(group);
  } catch (error) {
    console.log("CREATE GROUP ERROR:", error);
    res.status(500).json({ error });
  }
};

// ✅ GET GROUPS
export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.log("GET GROUP ERROR:", error);
    res.status(500).json({ error });
  }
};

export const updateGroupMonths = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { duration, totalMonths } = req.body;
    const groupDuration = duration ?? totalMonths;

    const updated = await Group.findByIdAndUpdate(
      id,
      { duration: groupDuration },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    console.log("UPDATE MONTH ERROR:", err);
    res.status(500).json({ error: err });
  }
};
