import type { Request, Response } from "express";
import { Book } from "../models/book.model.ts";
import {
  fetchOpenLibraryBookDetails,
  getOpenLibraryCover,
  searchOpenLibraryBooks,
} from "../utils/openLibrary.ts";

const normalizeBook = async (bookData: any) => {
  return {
    id: bookData.openLibraryId || bookData._id?.toString() || bookData.key,
    openLibraryId: bookData.openLibraryId || bookData.key,
    title: bookData.title,
    authors: bookData.authors || bookData.author_name || ["Unknown Author"],
    cover: bookData.cover || getOpenLibraryCover(bookData.cover_i),
    description: bookData.description || "No description available.",
    publishedYear: bookData.publishedYear || bookData.first_publish_year || "N/A",
    genres: bookData.genres || bookData.subjects || [],
  };
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const docs = await searchOpenLibraryBooks(query);

    const books = docs.map((item) => ({
      id: item.key.replace("/works/", ""),
      title: item.title,
      authors: item.author_name || ["Unknown Author"],
      cover: getOpenLibraryCover(item.cover_i),
      publishedYear: item.first_publish_year || "N/A",
    }));

    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ message: "Error searching books" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;
    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    let book = await Book.findOne({ openLibraryId: id });

    if (!book) {
      const details = await fetchOpenLibraryBookDetails(id);
      const description =
        typeof details.description === "string"
          ? details.description
          : details.description?.value || "No description available.";
      const authors = Array.isArray(details.authors)
        ? details.authors.map((author: any) => author.name || "Unknown Author")
        : ["Unknown Author"];

      book = await Book.create({
        openLibraryId: id,
        title: details.title || "Untitled",
        authors,
        cover: getOpenLibraryCover(details.covers?.[0]),
        description,
        publishedYear: details.first_publish_date || details.created?.value || "N/A",
        genres: details.subjects || [],
      } as any);
    }

    return res.status(200).json({ book: await normalizeBook(book) });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book details" });
  }
};

