import express from "express";
import { getActivityFeed } from "../controllers/activity.controller.ts";
import protect from "../middleware/auth.ts";

const router = express.Router();

router.use(protect);
router.get("/", getActivityFeed);

export default router;

