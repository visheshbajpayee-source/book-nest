import express from "express";
import { getUserStats } from "../controllers/stats.controller.ts";
import protect from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);
router.get("/", getUserStats);

export default router;

