import express from "express";
import {
  createMember,
  getMembersByGroup,
  updateMember,
} from "../controllers/member.controller";
import { deleteMember } from "../controllers/member.controller";

const router = express.Router();

router.post("/", createMember);
router.get("/:groupId", getMembersByGroup);
router.delete("/:id", deleteMember);
router.put("/:id", updateMember);

export default router;
