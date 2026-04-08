import { Request, Response } from "express";
import Payment from "../models/payment.model";
import Group from "../models/group.model";

// ✅ CREATE PAYMENT
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { memberId, groupId, month } = req.body;

    // 🔍 Validate input
    if (!memberId || !groupId || !month) {
      return res.status(400).json({
        message: "memberId, groupId and month are required",
      });
    }

    // 🔍 Check group exists
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    // 🔍 Validate required fields (TypeScript safe)
    if (group.totalAmount == null || group.duration == null) {
      return res.status(400).json({
        message: "Group data invalid",
      });
    }

    // 🚫 Prevent duplicate payment
    const existing = await Payment.findOne({
      memberId,
      groupId,
      month,
    });

    if (existing) {
      return res.status(400).json({
        message: "Payment already exists for this month",
      });
    }

    // 💰 Auto calculate amount
    const monthlyAmount = group.totalAmount / group.duration;

    // ✅ Create payment
    const payment = await Payment.create({
      memberId,
      groupId,
      month,
      amountPaid: monthlyAmount,
      status: "paid",
    });

    res.json(payment);
  } catch (error) {
    console.log("CREATE PAYMENT ERROR:", error);
    res.status(500).json({ error });
  }
};

// ✅ GET PAYMENTS BY GROUP
export const getPaymentsByGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    const payments = await Payment.find({ groupId }).populate("memberId");

    res.json(payments);
  } catch (error) {
    console.log("GET PAYMENTS ERROR:", error);
    res.status(500).json({ error });
  }
};

export const deletePayment = async (req: any, res: any) => {
  try {
    const { memberId, groupId, month } = req.body;

    const payment = await Payment.findOneAndDelete({
      memberId,
      groupId,
      month,
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json({ message: "Payment reverted successfully" });
  } catch (err) {
    console.log("DELETE PAYMENT ERROR:", err);
    res.status(500).json({ error: err });
  }
};
