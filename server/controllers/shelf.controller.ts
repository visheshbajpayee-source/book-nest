import type { Request, Response } from "express";
import { Book } from "../models/book.model.ts";
import { BookshelfEntry } from "../models/bookshelf.model.ts";
import { logActivity } from "../utils/activity.ts";

interface AuthRequest extends Request {
  user?: any;
}

const findOrCreateBook = async (bookData: any) => {
  const openLibraryId = bookData.openLibraryId || bookData.id;
  if (!openLibraryId) {
    throw new Error("Book id is required");
  }

  const book = await Book.findOneAndUpdate(
    { openLibraryId },
    {
      openLibraryId,
      title: bookData.title,
      authors: bookData.authors || ["Unknown Author"],
      cover: bookData.cover || "",
      description: bookData.description || "",
      publishedYear: bookData.publishedYear || "N/A",
      genres: bookData.genres || [],
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

  return book;
};

export const getShelfEntries = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const entries = await BookshelfEntry.find({ user: userId }).populate("book");

    return res.status(200).json({ shelf: entries });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching shelf entries" });
  }
};

export const addShelfEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { book, status = "want_to_read", progress = 0, notes = "" } = req.body;

    if (!book || !book.id) {
      return res.status(400).json({ message: "Valid book data is required" });
    }

    const persistedBook = await findOrCreateBook(book);

    const existingEntry = await BookshelfEntry.findOne({
      user: userId,
      book: persistedBook._id,
    });

    if (existingEntry) {
      return res.status(409).json({ message: "Book already exists in shelf" });
    }

    const entry = await BookshelfEntry.create({
      user: userId,
      book: persistedBook._id,
      status,
      progress,
      notes,
      startDate: status === "currently_reading" ? new Date() : undefined,
      finishDate: status === "finished" ? new Date() : undefined,
    } as any);

    await logActivity(
      userId.toString(),
      "shelf_add",
      "BookshelfEntry",
      entry._id.toString(),
      `Added ${persistedBook.title} to shelf`
    );

    return res.status(201).json({ shelfEntry: await entry.populate("book") });
  } catch (error) {
    return res.status(500).json({ message: "Error adding book to shelf" });
  }
};

export const updateShelfEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const id = req.params.id as string | undefined;
    const { status, progress, notes, startDate, finishDate } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Entry ID is required" });
    }

    const entry = await BookshelfEntry.findOne({ _id: id, user: userId });
    if (!entry) {
      return res.status(404).json({ message: "Shelf entry not found" });
    }

    if (status) entry.status = status;
    if (typeof progress === "number") entry.progress = progress;
    if (typeof notes === "string") entry.notes = notes;
    if (startDate) entry.startDate = new Date(startDate);
    if (finishDate) entry.finishDate = new Date(finishDate);

    await entry.save();

    return res.status(200).json({ shelfEntry: await entry.populate("book") });
  } catch (error) {
    return res.status(500).json({ message: "Error updating shelf entry" });
  }
};

export const removeShelfEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const id = req.params.id as string | undefined;

    if (!id) {
      return res.status(400).json({ message: "Entry ID is required" });
    }

    const entry = await BookshelfEntry.findOneAndDelete({ _id: id, user: userId });
    if (!entry) {
      return res.status(404).json({ message: "Shelf entry not found" });
    }

    return res.status(200).json({ message: "Shelf entry removed" });
  } catch (error) {
    return res.status(500).json({ message: "Error removing shelf entry" });
  }
};

