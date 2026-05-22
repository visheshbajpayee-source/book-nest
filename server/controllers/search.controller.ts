import type { Request, Response } from "express";
import { User } from "../models/user.model.ts";
import { Book } from "../models/book.model.ts";
import { ReadingList } from "../models/readingList.model.ts";

export const searchResources = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i");

    const users = await User.find({
      $or: [{ name: regex }, { userName: regex }],
    }).select("name userName avatar").limit(20);

    const books = await Book.find({
      $or: [{ title: regex }, { authors: regex }],
    }).limit(20);

    const lists = await ReadingList.find({
      visibility: "public",
      $or: [{ title: regex }, { description: regex }],
    })
      .populate("owner", "name userName avatar")
      .limit(20);

    return res.status(200).json({ users, books, lists });
  } catch (error) {
    return res.status(500).json({ message: "Error searching resources" });
  }
};
