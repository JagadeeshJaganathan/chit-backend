import { Request, Response } from "express";
import Group from "../models/group.model";

// ✅ CREATE GROUP
export const createGroup = async (req: Request, res: Response) => {
  try {
    const {
      name,
      totalAmount,
      memberLimit,
      duration,
      totalMonths,
      startDate,
    } = req.body;
    const groupDuration = duration ?? totalMonths;
    const groupStartDate = startDate ? new Date(startDate) : undefined;

    // 🔍 Validation (recommended)
    if (!name || !totalAmount || !memberLimit || !groupDuration) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    if (groupStartDate && Number.isNaN(groupStartDate.getTime())) {
      return res.status(400).json({
        message: "Invalid start date",
      });
    }

    const group = await Group.create({
      name,
      totalAmount,
      memberLimit,
      duration: groupDuration,
      startDate: groupStartDate,
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
    const { duration, totalMonths, startDate } = req.body;
    const groupDuration = duration ?? totalMonths;
    const updateData: { duration?: number; startDate?: Date } = {};

    if (groupDuration) {
      updateData.duration = groupDuration;
    }

    if (startDate) {
      const parsedStartDate = new Date(startDate);

      if (Number.isNaN(parsedStartDate.getTime())) {
        return res.status(400).json({
          message: "Invalid start date",
        });
      }

      updateData.startDate = parsedStartDate;
    }

    const updated = await Group.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    res.json(updated);
  } catch (err) {
    console.log("UPDATE MONTH ERROR:", err);
    res.status(500).json({ error: err });
  }
};
