"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { addBookToShelf, getShelfBooks } from "@/lib/shelfstorage";
import { Book } from "@/types";
import { books as mockBooks } from "@/data/mockData";

type OpenLibraryWork = {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
};

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const getCoverUrl = (coverId?: number) => {
    if (!coverId) {
      return "https://placehold.co/300x450?text=No+Cover";
    }

    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  };

  const getDescription = (description?: string | { value: string }) => {
    if (!description) return "No description available.";

    if (typeof description === "string") {
      return description;
    }

    return description.value || "No description available.";
  };

  useEffect(() => {
    if (!bookId) return;

    const loadBook = async () => {
      try {
        setLoading(true);

        // 1. First check dummy/mockData books
        const mockBook = mockBooks.find((item) => item.id === bookId);

        if (mockBook) {
          setBook(mockBook);
          return;
        }

        // 2. Then check localStorage shelf books
        const shelfBooks = getShelfBooks();
        const shelfBook = shelfBooks.find((item) => item.book.id === bookId);

        if (shelfBook) {
          setBook(shelfBook.book);
          return;
        }

        // 3. Then fetch from Open Library only if ID looks valid
        if (!bookId.startsWith("OL")) {
          setBook(null);
          return;
        }

        const response = await fetch(
          `https://openlibrary.org/works/${bookId}.json`
        );

        if (!response.ok) {
          throw new Error("Book not found");
        }

        const data: OpenLibraryWork = await response.json();

        const openLibraryBook: Book = {
          id: bookId,
          title: data.title,
          author: "Open Library",
          cover: getCoverUrl(data.covers?.[0]),
          publishedYear: "N/A",
          description: getDescription(data.description),
          rating: 0,
          pages: "N/A",
          genres: data.subjects?.slice(0, 5) || [],
        };

        setBook(openLibraryBook);
      } catch (error) {
        console.log("Book detail error:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [bookId]);

  const handleAddShelf = () => {
    if (!book) return;

    const result = addBookToShelf(book, "want_to_read");

    alert(result.message);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
        Loading book detail...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        <h1 className="text-2xl font-bold">Book not found</h1>

        <p className="mt-2 text-slate-500">
          This book detail could not be loaded.
        </p>

        <Link
          href="/books"
          className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <Link href="/books" className="text-sm font-medium text-indigo-600">
          ← Back to Books
        </Link>

        <Link href="/shelf" className="text-sm font-medium text-indigo-600">
          Go to Shelf
        </Link>
      </div>

      <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <img
            src={book.cover}
            alt={book.title}
            className="h-[480px] w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-slate-900">{book.title}</h1>

          <p className="mt-2 text-lg text-slate-600">by {book.author}</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
            <span>Published: {book.publishedYear}</span>
            <span>Pages: {book.pages || "N/A"}</span>
            <span>Rating: {book.rating || 0}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {book.genres?.length ? (
              book.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                No genres
              </span>
            )}
          </div>

          <p className="mt-6 max-w-3xl leading-7 text-slate-700">
            {book.description || "No description available."}
          </p>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={handleAddShelf}
              className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Add to Shelf
            </button>

            <Link
              href="/shelf"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium hover:bg-slate-50"
            >
              View Shelf
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}