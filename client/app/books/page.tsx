"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { addBookToShelf } from "@/lib/shelfstorage";
import { Book } from "@/types";

type OpenLibraryBook = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

export default function BooksPage() {
  const [query, setQuery] = useState("atomic habits");
  const [books, setBooks] = useState<OpenLibraryBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingBookId, setSavingBookId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchBooks = async (searchText: string) => {
    if (!searchText.trim()) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchText
        )}&limit=12`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data.docs || []);
    } catch {
      setError("Something went wrong while fetching books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialBooks = async () => {
      await fetchBooks("atomic habits");
    };

    void loadInitialBooks();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchBooks(query);
  };

  const getCoverUrl = (coverId?: number) => {
    if (!coverId) {
      return "https://placehold.co/300x450?text=No+Cover";
    }

    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  };

  const getBookDescription = async (bookId: string) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/works/${bookId}.json`
      );

      if (!response.ok) {
        return "No description available.";
      }

      const data = await response.json();

      if (!data.description) {
        return "No description available.";
      }

      if (typeof data.description === "string") {
        return data.description;
      }

      return data.description.value || "No description available.";
    } catch {
      return "No description available.";
    }
  };

  const handleAddShelf = async (item: OpenLibraryBook) => {
    const bookId = item.key.replace("/works/", "");

    try {
      setSavingBookId(bookId);

      const description = await getBookDescription(bookId);

      const bookToAdd: Book = {
        id: bookId,
        title: item.title,
        author: item.author_name?.join(", ") || "Unknown Author",
        cover: getCoverUrl(item.cover_i),
        publishedYear: item.first_publish_year || "N/A",
        description,
        rating: 0,
        pages: "N/A",
        genres: [],
      };

      const result = addBookToShelf(bookToAdd, "want_to_read");

      alert(result.message);
    } catch {
      alert("Failed to add book to shelf.");
    } finally {
      setSavingBookId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-2 dark:bg-[#111111]">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-[#5b342b] dark:text-[#f5e9df]">
          Explore Books
        </h1>

        <p className="mt-3 text-[#6b7280] dark:text-slate-400">
          Search books using the Open Library API.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-10 rounded-[32px] border border-[#e7ddd5] bg-white p-6 shadow-xl dark:border-[#2a2a2a] dark:bg-[#181818]"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search book name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-[#ddd6cf] bg-[#faf7f5] px-5 py-4 text-[#2e2e2e] outline-none transition-all duration-300 placeholder:text-[#9ca3af] focus:border-[#5b342b] focus:ring-4 focus:ring-[#5b342b]/10 dark:border-[#2a2a2a] dark:bg-[#121212] dark:text-white"
          />

          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-[#5b342b] to-[#74463a] px-8 py-4 font-semibold text-white shadow-[0_8px_20px_rgba(91,52,43,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(91,52,43,0.4)] active:scale-95"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="rounded-[30px] border border-[#e7ddd5] bg-white p-12 text-center text-[#6b7280] shadow-lg dark:border-[#2a2a2a] dark:bg-[#181818] dark:text-slate-300">
          Loading books...
        </div>
      )}

      {error && (
        <div className="rounded-[30px] border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="rounded-[30px] border border-[#e7ddd5] bg-white p-12 text-center text-[#6b7280] shadow-lg dark:border-[#2a2a2a] dark:bg-[#181818] dark:text-slate-300">
          No books found.
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => {
            const bookId = book.key.replace("/works/", "");

            return (
              <div
                key={book.key}
                className="group overflow-hidden rounded-[32px] border border-[#e7ddd5] bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl dark:border-[#2a2a2a] dark:bg-[#181818]"
              >
                <div className="flex h-80 items-center justify-center overflow-hidden bg-[#f3ebe7] p-5 dark:bg-[#121212]">
                   <img src={getCoverUrl(book.cover_i)} alt={book.title} className="h-full w-auto object-contain transition-all duration-700 group-hover:scale-105"/>
                  </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 text-xl font-bold text-[#2e2e2e] dark:text-white">
                    {book.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#6b7280] dark:text-slate-400">
                    {book.author_name?.join(", ") || "Unknown Author"}
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#5b342b] dark:text-[#c89b8a]">
                    Published: {book.first_publish_year || "N/A"}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/books/${bookId}`}
                      className="flex-1 rounded-xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
                    >
                      Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleAddShelf(book)}
                      disabled={savingBookId === bookId}
                      className="flex-1 rounded-xl border border-[#d8d0c8] bg-[#faf7f5] px-4 py-3 text-sm font-semibold text-[#5b342b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f1ebe6] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#333] dark:bg-[#1f1f1f] dark:text-[#f5e9df]"
                    >
                      {savingBookId === bookId ? "Saving..." : "Add Shelf"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}