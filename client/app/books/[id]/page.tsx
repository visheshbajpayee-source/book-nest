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

        const mockBook = mockBooks.find((item) => item.id === bookId);

        if (mockBook) {
          setBook(mockBook);
          return;
        }

        const shelfBooks = getShelfBooks();
        const shelfBook = shelfBooks.find((item) => item.book.id === bookId);

        if (shelfBook) {
          setBook(shelfBook.book);
          return;
        }

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
      <div className="rounded-[32px] border border-[#e7ddd5] bg-white p-12 text-center text-[#6b7280] shadow-xl dark:border-[#2a2a2a] dark:bg-[#181818] dark:text-slate-300">
        Loading book detail...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="rounded-[32px] border border-[#e7ddd5] bg-white p-12 text-center shadow-xl dark:border-[#2a2a2a] dark:bg-[#181818]">
        <h1 className="text-3xl font-bold text-[#5b342b] dark:text-[#f5e9df]">
          Book not found
        </h1>

        <p className="mt-3 text-[#6b7280] dark:text-slate-400">
          This book detail could not be loaded.
        </p>

        <Link
          href="/books"
          className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-[#5b342b] to-[#74463a] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-2 dark:bg-[#111111]">
      <div className="mb-8 flex flex-wrap gap-5">
        <Link
          href="/books"
          className="text-sm font-semibold text-[#5b342b] transition-all duration-300 hover:translate-x-1 hover:underline dark:text-[#c89b8a]"
        >
          ← Back to Books
        </Link>

        <Link
          href="/shelf"
          className="text-sm font-semibold text-[#5b342b] transition-all duration-300 hover:translate-x-1 hover:underline dark:text-[#c89b8a]"
        >
          Go to Shelf
        </Link>
      </div>

      <section className="grid gap-10 lg:grid-cols-[340px_1fr]">
        <div className="group overflow-hidden rounded-[32px] border border-[#e7ddd5] bg-white shadow-xl dark:border-[#2a2a2a] dark:bg-[#181818]">
          <div className="overflow-hidden">
            <img
              src={book.cover}
              alt={book.title}
              className="h-[520px] w-full object-cover transition-all duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-[#e7ddd5] bg-white p-8 shadow-xl dark:border-[#2a2a2a] dark:bg-[#181818]">
          <h1 className="text-5xl font-bold leading-tight text-[#5b342b] dark:text-[#f5e9df]">
            {book.title}
          </h1>

          <p className="mt-4 text-xl text-[#6b7280] dark:text-slate-400">
            by {book.author}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full bg-[#f3ebe7] px-4 py-2 font-medium text-[#5b342b] dark:bg-[#5b342b]/10 dark:text-[#d8b7a8]">
              Published: {book.publishedYear}
            </span>

            <span className="rounded-full bg-[#f3ebe7] px-4 py-2 font-medium text-[#5b342b] dark:bg-[#5b342b]/10 dark:text-[#d8b7a8]">
              Pages: {book.pages || "N/A"}
            </span>

            <span className="rounded-full bg-[#f3ebe7] px-4 py-2 font-medium text-[#5b342b] dark:bg-[#5b342b]/10 dark:text-[#d8b7a8]">
              Rating: {book.rating || 0}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {book.genres?.length ? (
              book.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-[#d8d0c8] bg-[#faf7f5] px-4 py-2 text-sm font-semibold text-[#5b342b] transition-all duration-300 hover:-translate-y-1 dark:border-[#333] dark:bg-[#1f1f1f] dark:text-[#f5e9df]"
                >
                  {genre}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-500/10 dark:text-slate-300">
                No genres
              </span>
            )}
          </div>

          <div className="mt-8 rounded-[28px] bg-[#faf7f5] p-6 dark:bg-[#121212]">
            <h2 className="text-2xl font-bold text-[#5b342b] dark:text-[#f5e9df]">
              Description
            </h2>

            <p className="mt-5 leading-8 text-[#4b5563] dark:text-slate-300">
              {book.description || "No description available."}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleAddShelf}
              className="rounded-2xl bg-gradient-to-r from-[#5b342b] to-[#74463a] px-7 py-4 font-semibold text-white shadow-[0_8px_20px_rgba(91,52,43,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(91,52,43,0.4)] active:scale-95"
            >
              Add to Shelf
            </button>

            <Link
              href="/shelf"
              className="rounded-2xl border border-[#d8d0c8] bg-[#faf7f5] px-7 py-4 font-semibold text-[#5b342b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f1ebe6] dark:border-[#333] dark:bg-[#1f1f1f] dark:text-[#f5e9df]"
            >
              View Shelf
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}