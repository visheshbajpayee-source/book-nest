import type { Request, Response } from "express";
import { Review } from "../models/review.model.ts";
import { Book } from "../models/book.model.ts";
import { logActivity } from "../utils/activity.ts";

interface AuthRequest extends Request {
  user?: any;
}

export const getBookReviews = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId as string | undefined;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const book = await Book.findOne({ openLibraryId: bookId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const reviews = await Review.find({ book: book._id }).populate("user", "name userName avatar");
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reviews" });
  }
};

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { bookId, rating, text } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!bookId || typeof rating !== "number") {
      return res.status(400).json({ message: "Book ID and rating are required" });
    }

    const book = await Book.findOne({ openLibraryId: bookId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = await Review.create({
      user: userId,
      book: book._id,
      rating,
      text: text || "",
      likes: [],
    });

    await logActivity(
      userId.toString(),
      "review_create",
      "Review",
      review._id.toString(),
      `Review added for ${book.title}`
    );

    return res.status(201).json({ review });
  } catch (error) {
    return res.status(500).json({ message: "Error creating review" });
  }
};

export const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const { rating, text } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this review" });
    }

    if (typeof rating === "number") {
      review.rating = rating;
    }
    if (typeof text === "string") {
      review.text = text;
    }

    await review.save();
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ message: "Error updating review" });
  }
};

export const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();
    return res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting review" });
  }
};

export const likeReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.likes.some((like) => like.toString() === userId.toString())) {
      return res.status(400).json({ message: "You already liked this review" });
    }

    review.likes.push(userId);
    await review.save();

    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ message: "Error liking review" });
  }
};

export const unlikeReview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.likes = review.likes.filter((like) => like.toString() !== userId.toString());
    await review.save();

    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ message: "Error unliking review" });
  }
};

