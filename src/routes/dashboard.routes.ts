import express from "express";
import { getDashboard } from "../controllers/dashboard.controller";

const router = express.Router();

// groupId + month
router.get("/:groupId/:month", getDashboard);

export default router;
