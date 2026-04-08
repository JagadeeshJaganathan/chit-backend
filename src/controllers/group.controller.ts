import { Request, Response } from "express";
import Group from "../models/group.model";

// ✅ CREATE GROUP
export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, totalAmount, memberLimit, totalMonths } = req.body;

    // 🔍 Validation (recommended)
    if (!name || !totalAmount || !memberLimit || !totalMonths) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const group = await Group.create({
      name,
      totalAmount,
      memberLimit,
      totalMonths, // 🔥 important
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
    const { totalMonths } = req.body;

    const updated = await Group.findByIdAndUpdate(
      id,
      { totalMonths },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    console.log("UPDATE MONTH ERROR:", err);
    res.status(500).json({ error: err });
  }
};
