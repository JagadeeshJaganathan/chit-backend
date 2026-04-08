import express from "express";
import {
  selectWinner,
  getWinnersByGroup,
  deleteWinner,
} from "../controllers/winner.controller";

const router = express.Router();

router.post("/", selectWinner);
router.get("/:groupId", getWinnersByGroup);
router.delete("/:id", deleteWinner);

export default router;
