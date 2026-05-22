import express from "express";
import {
  addShelfEntry,
  getShelfEntries,
  removeShelfEntry,
  updateShelfEntry,
} from "../controllers/shelf.controller.ts";
import protect from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);
router.get("/", getShelfEntries);
router.post("/", addShelfEntry);
router.put("/:id", updateShelfEntry);
router.delete("/:id", removeShelfEntry);

export default router;

