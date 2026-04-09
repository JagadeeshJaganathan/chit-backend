import express from "express";
import {
  getGroups,
  updateGroupMonths,
} from "../controllers/group.controller";

const router = express.Router();

router.get("/", getGroups);
router.patch("/:id", updateGroupMonths);

export default router;
