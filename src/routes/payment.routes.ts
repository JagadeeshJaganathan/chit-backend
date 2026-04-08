import express from "express";
import {
  createPayment,
  deletePayment,
  getPaymentsByGroup,
} from "../controllers/payment.controller";

const router = express.Router();

router.post("/", createPayment);
router.get("/:groupId", getPaymentsByGroup);
router.post("/revert", deletePayment);

export default router;
