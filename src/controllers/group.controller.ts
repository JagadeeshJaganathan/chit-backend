import { Request, Response } from "express";
import Group from "../models/group.model";
import Member from "../models/member.model";
import Payment from "../models/payment.model";
import Winner from "../models/winner.model";

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
      isEnded: false,
      endedAt: null,
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
    const groups = await Group.find().sort({
      isEnded: 1,
      startDate: -1,
      name: 1,
    });
    res.json(groups);
  } catch (error) {
    console.log("GET GROUP ERROR:", error);
    res.status(500).json({ error });
  }
};

export const updateGroupSettings = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { duration, totalMonths, startDate, name, totalAmount, memberLimit } =
      req.body;
    const groupDuration = duration ?? totalMonths;
    const updateData: {
      duration?: number;
      startDate?: Date;
      name?: string;
      totalAmount?: number;
      memberLimit?: number;
    } = {};

    if (groupDuration) {
      updateData.duration = groupDuration;
    }

    if (name) {
      updateData.name = name;
    }

    if (totalAmount) {
      updateData.totalAmount = totalAmount;
    }

    if (memberLimit) {
      updateData.memberLimit = memberLimit;
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

export const endGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await Group.findByIdAndUpdate(
      id,
      {
        isEnded: true,
        endedAt: new Date(),
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    res.json(updated);
  } catch (error) {
    console.log("END GROUP ERROR:", error);
    res.status(500).json({ error });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    await Promise.all([
      Member.deleteMany({ groupId: id }),
      Payment.deleteMany({ groupId: id }),
      Winner.deleteMany({ groupId: id }),
      Group.findByIdAndDelete(id),
    ]);

    res.json({
      message: "Group deleted successfully",
    });
  } catch (error) {
    console.log("DELETE GROUP ERROR:", error);
    res.status(500).json({ error });
  }
};
