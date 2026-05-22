import express from "express";
import {
  createReview,
  deleteReview,
  getBookReviews,
  updateReview,
  likeReview,
  unlikeReview,
} from "../controllers/reviews.controller.ts";
import protect from "../middleware/auth.ts";

const router = express.Router();

router.get("/book/:bookId", getBookReviews);
router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.post("/:id/like", protect, likeReview);
router.delete("/:id/like", protect, unlikeReview);
router.delete("/:id", protect, deleteReview);

export default router;

