import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ReadingList } from "../models/readingList.model.ts";
import { Book } from "../models/book.model.ts";
import { logActivity } from "../utils/activity.ts";

interface AuthRequest extends Request {
  user?: any;
}

const getUserIdFromToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : undefined;

  if (!token) {
    return null;
  }

  try {
    const secret = process.env.JWT_SECRET || "booknest-secret";
    const decoded = jwt.verify(token, secret) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
};

export const getPublicReadingLists = async (req: Request, res: Response) => {
  try {
    const lists = await ReadingList.find({ visibility: "public" })
      .populate("books")
      .populate("owner", "name userName avatar");

    return res.status(200).json({ lists });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching public reading lists" });
  }
};

export const getReadingListById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = getUserIdFromToken(req);

    const list = await ReadingList.findById(id)
      .populate("books")
      .populate("owner", "name userName avatar");

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (list.visibility === "private" && list.owner._id.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to view this list" });
    }

    return res.status(200).json({ list });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reading list" });
  }
};

export const getReadingLists = async (req: AuthRequest, res: Response) => {
  try {
    const { publicOnly } = req.query;
    const filters: Record<string, any> = {};

    if (publicOnly === "true") {
      filters.visibility = "public";
    }

    if (req.user && publicOnly !== "true") {
      filters.owner = req.user._id;
    }

    const lists = await ReadingList.find(filters).populate("books");
    return res.status(200).json({ lists });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching reading lists" });
  }
};

const resolveBookIds = async (bookIds: string[]) => {
  const books = await Book.find({ openLibraryId: { $in: bookIds } });
  return books.map((book) => book._id);
};

export const createReadingList = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { title, description = "", coverImage = "", bookIds = [], visibility = "public" } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const books = await resolveBookIds(bookIds || []);
    const list = await ReadingList.create({
      owner: userId,
      title,
      description,
      coverImage,
      books,
      visibility,
    });

    await logActivity(
      userId.toString(),
      "list_create",
      "ReadingList",
      list._id.toString(),
      `Created reading list ${title}`
    );

    return res.status(201).json({ list });
  } catch (error) {
    return res.status(500).json({ message: "Error creating reading list" });
  }
};

export const updateReadingList = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;
    const { title, description, coverImage, bookIds, visibility } = req.body;

    const list = await ReadingList.findById(id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (list.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this list" });
    }

    if (title) list.title = title;
    if (typeof description === "string") list.description = description;
    if (typeof coverImage === "string") list.coverImage = coverImage;
    if (visibility) list.visibility = visibility;
    if (Array.isArray(bookIds)) {
      list.books = await resolveBookIds(bookIds);
    }

    await list.save();
    return res.status(200).json({ list });
  } catch (error) {
    return res.status(500).json({ message: "Error updating reading list" });
  }
};

export const deleteReadingList = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { id } = req.params;

    const list = await ReadingList.findById(id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (list.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this list" });
    }

    await list.deleteOne();
    return res.status(200).json({ message: "Reading list deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting reading list" });
  }
};

