import { Request, Response } from "express";
import Member from "../models/member.model";
import Group from "../models/group.model";

// ✅ CREATE MEMBER
export const createMember = async (req: Request, res: Response) => {
  try {
    const { name, phone, groupId } = req.body;

    // 🔍 Validate input
    if (!name || !phone || !groupId) {
      return res.status(400).json({
        message: "name, phone, groupId required",
      });
    }

    // 🔍 Check group exists
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    // 🔒 Enforce member limit
    const count = await Member.countDocuments({ groupId });

    if (group.memberLimit != null && count >= group.memberLimit) {
      return res.status(400).json({
        message: "Member limit reached",
      });
    }

    // 🚫 Prevent duplicate phone in same group
    const existing = await Member.findOne({ phone, groupId });

    if (existing) {
      return res.status(400).json({
        message: "Member already exists in this group",
      });
    }

    // ✅ Create member
    const member = await Member.create({
      name,
      phone,
      groupId,
    });

    res.json(member);
  } catch (error) {
    console.log("CREATE MEMBER ERROR:", error);
    res.status(500).json({ error });
  }
};

// ✅ GET MEMBERS BY GROUP
export const getMembersByGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const members = await Member.find({ groupId });

    res.json(members);
  } catch (error) {
    console.log("GET MEMBERS ERROR:", error);
    res.status(500).json({ error });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Member.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json({
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.log("DELETE MEMBER ERROR:", error);
    res.status(500).json({ error });
  }
};

export const updateMember = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const updated = await Member.findByIdAndUpdate(
      id,
      { name, phone },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    console.log("UPDATE MEMBER ERROR:", err);
    res.status(500).json({ error: err });
  }
};
