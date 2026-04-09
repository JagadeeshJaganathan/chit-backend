import express from "express";
import Group from "../models/group.model";
import Member from "../models/member.model";
import Payment from "../models/payment.model";
import Winner from "../models/winner.model";

const router = express.Router();

/* ================= HELPER ================= */
const getCurrentMonth = (startDate: Date) => {
  const now = new Date();

  const yearDiff = now.getFullYear() - startDate.getFullYear();
  const monthDiff = now.getMonth() - startDate.getMonth();

  const total = yearDiff * 12 + monthDiff + 1;

  return total > 0 ? total : 1;
};

/* ================= DASHBOARD ================= */
router.get("/:groupId/:month", async (req, res) => {
  try {
    const { groupId, month } = req.params;
    const selectedMonth = Number(month);

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // 🔥 current month (based on startDate)
    let currentMonth = getCurrentMonth(group.startDate);

    // limit to duration
    if (currentMonth > group.duration) {
      currentMonth = group.duration;
    }

    /* ================= MEMBERS ================= */
    const members = await Member.find({ groupId });

    /* ================= PAYMENTS ================= */
    const payments = await Payment.find({
      groupId,
      month: selectedMonth,
    });

    const paidIds = payments.map((p: any) =>
      p.memberId ? p.memberId.toString() : "",
    );

    const paidMembers = members.filter((m) =>
      paidIds.includes(m._id.toString()),
    );

    const pendingMembers = members.filter(
      (m) => !paidIds.includes(m._id.toString()),
    );

    /* ================= WINNER ================= */
    const winnerDoc = await Winner.findOne({
      groupId,
      month: selectedMonth,
    }).populate("memberId");

    const allWinners = await Winner.find({ groupId }).populate("memberId");

    /* ================= RESPONSE ================= */
    res.json({
      totalMembers: members.length,
      paidCount: paidMembers.length,
      pendingCount: pendingMembers.length,
      paidMembers,
      pendingMembers,
      winner: winnerDoc?.memberId || null,
      allWinners: allWinners.map((w) => ({
        month: w.month,
        member: w.memberId,
      })),

      // 🔥 IMPORTANT
      currentMonth,
      startDate: group.startDate,
      duration: group.duration,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Dashboard error" });
  }
});

export default router;
