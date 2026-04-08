import { Request, Response } from "express";
import Member from "../models/member.model";
import Payment from "../models/payment.model";
import Winner from "../models/winner.model";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const { groupId, month } = req.params;
    const monthNumber = Number(month);

    if (!groupId || isNaN(monthNumber)) {
      return res.status(400).json({
        message: "Invalid groupId or month",
      });
    }

    // 👥 Members
    const members = await Member.find({ groupId });

    // 💰 Payments
    const payments = await Payment.find({
      groupId,
      month: monthNumber,
    });

    // 🏆 Current Winner
    const winnerDoc = await Winner.findOne({
      groupId,
      month: monthNumber,
    }).populate("memberId");

    // 🏆 ALL WINNERS (🔥 IMPORTANT)
    const allWinners = await Winner.find({ groupId });

    // ✅ Paid members
    const paidMemberIds = payments.map((p) => String(p.memberId));

    const paidMembers = members.filter((m) =>
      paidMemberIds.includes(String(m._id)),
    );

    const pendingMembers = members.filter(
      (m) => !paidMemberIds.includes(String(m._id)),
    );

    res.json({
      totalMembers: members.length,
      paidCount: paidMembers.length,
      pendingCount: pendingMembers.length,
      paidMembers,
      pendingMembers,
      winner: winnerDoc ? winnerDoc.memberId : null,
      allWinners, // 🔥 IMPORTANT
    });
  } catch (error) {
    console.log("DASHBOARD ERROR:", error);
    res.status(500).json({ error });
  }
};
