import type { Request, Response } from "express";
import { BookshelfEntry } from "../models/bookshelf.model.ts";
import { Review } from "../models/review.model.ts";
import { Activity } from "../models/activity.model.ts";

interface AuthRequest extends Request {
  user?: any;
}

export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const shelfEntries = await BookshelfEntry.find({ user: userId });
    const reviews = await Review.find({ user: userId });
    const activities = await Activity.find({ user: userId });

    const totalBooks = shelfEntries.length;
    const completed = shelfEntries.filter((entry) => entry.progress >= 100).length;
    const currentlyReading = shelfEntries.filter((entry) => entry.progress > 0 && entry.progress < 100).length;
    const pending = shelfEntries.filter((entry) => entry.progress === 0).length;
    const averageRating = reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    return res.status(200).json({
      stats: {
        totalBooks,
        completed,
        currentlyReading,
        pending,
        reviewsWritten: reviews.length,
        averageRating: Number(averageRating.toFixed(1)),
        activityCount: activities.length,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching stats" });
  }
};

