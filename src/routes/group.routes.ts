import express from "express";
import {
  createGroup,
  endGroup,
  getGroups,
  updateGroupSettings,
} from "../controllers/group.controller";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.patch("/:id", updateGroupSettings);
router.post("/:id/end", endGroup);

export default router;
