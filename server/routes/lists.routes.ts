import express from "express";
import {
  createReadingList,
  deleteReadingList,
  getReadingLists,
  updateReadingList,
  getReadingListById,
  getPublicReadingLists,
} from "../controllers/lists.controller.ts";
import protect from "../middleware/auth.ts";

const router = express.Router();

router.get("/public", getPublicReadingLists);
router.get("/:id", getReadingListById);

router.use(protect);
router.get("/", getReadingLists);
router.post("/", createReadingList);
router.put("/:id", updateReadingList);
router.delete("/:id", deleteReadingList);

export default router;

