import { Request, Response } from "express";
import Winner from "../models/winner.model";
import Member from "../models/member.model";

// ✅ SELECT WINNER
export const selectWinner = async (req: Request, res: Response) => {
  try {
    const { groupId, memberId, month } = req.body;

    if (!groupId || !memberId || !month) {
      return res.status(400).json({
        message: "groupId, memberId and month required",
      });
    }

    // 🔍 Check member belongs to group
    const member = await Member.findOne({ _id: memberId, groupId });

    if (!member) {
      return res.status(400).json({
        message: "Member not found in this group",
      });
    }

    // 🚫 Only one winner per month
    const existingMonthWinner = await Winner.findOne({ groupId, month });

    if (existingMonthWinner) {
      return res.status(400).json({
        message: "Winner already selected for this month",
      });
    }

    // 🚫 Prevent same member winning twice
    const alreadyWinner = await Winner.findOne({ groupId, memberId });

    if (alreadyWinner) {
      return res.status(400).json({
        message: "This member has already won",
      });
    }

    const winner = await Winner.create({
      groupId,
      memberId,
      month,
    });

    res.json({
      message: "Winner selected successfully",
      winner,
    });
  } catch (error) {
    console.log("WINNER ERROR:", error);
    res.status(500).json({ error });
  }
};

// ✅ GET WINNER HISTORY (FINAL)
export const getWinnersByGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const winners = await Winner.find({ groupId })
      .populate("memberId")
      .sort({ month: 1 }); // 🔥 IMPORTANT

    res.json(winners);
  } catch (error) {
    console.log("WINNER HISTORY ERROR:", error);
    res.status(500).json({ error });
  }
};

export const deleteWinner = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    await Winner.findByIdAndDelete(id);

    res.json({ message: "Winner deleted successfully" });
  } catch (err) {
    console.log("DELETE WINNER ERROR:", err);
    res.status(500).json({ error: err });
  }
};
