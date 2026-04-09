import express from "express";
import {
  createGroup,
  deleteGroup,
  endGroup,
  getGroups,
  updateGroupSettings,
} from "../controllers/group.controller";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.patch("/:id", updateGroupSettings);
router.post("/:id/end", endGroup);
router.delete("/:id", deleteGroup);

export default router;
