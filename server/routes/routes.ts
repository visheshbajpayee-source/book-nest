import express from "express";
import userRoutes from "./users.routes.ts";
import bookRoutes from "./books.routes.ts";
import shelfRoutes from "./shelf.routes.ts";
import reviewRoutes from "./reviews.routes.ts";
import listRoutes from "./lists.routes.ts";
import activityRoutes from "./activity.routes.ts";
import statsRoutes from "./stats.routes.ts";
import searchRoutes from "./search.routes.ts";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/search", searchRoutes);
router.use("/shelf", shelfRoutes);
router.use("/reviews", reviewRoutes);
router.use("/lists", listRoutes);
router.use("/activity", activityRoutes);
router.use("/stats", statsRoutes);

export default router;


