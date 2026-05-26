import type { Request, Response } from "express";
import { Activity } from "../models/activity.model.ts";
import { User } from "../models/user.model.ts";

interface AuthRequest extends Request {
  user?: any;
}

export const getActivityFeed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const currentUser = await User.findById(userId).select("following");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const feedUsers = [userId, ...(currentUser.following || [])];
    const activities = await Activity.find({ user: { $in: feedUsers } })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("user", "name userName avatar");

    return res.status(200).json({ activities });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching activity feed" });
  }
};

