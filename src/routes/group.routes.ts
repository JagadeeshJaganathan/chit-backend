import express from "express";
import {
  createGroup,
  getGroups,
  updateGroupMonths,
} from "../controllers/group.controller";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.put("/:id/months", updateGroupMonths);

export default router;
