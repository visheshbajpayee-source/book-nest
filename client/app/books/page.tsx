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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks("atomic habits");
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

      console.log("Saving book:", bookToAdd);

      const result = addBookToShelf(bookToAdd, "want_to_read");

      console.log("Save result:", result);
      console.log("LocalStorage shelf:", localStorage.getItem("booknest_shelf"));

      alert(result.message);
    } catch (error) {
      console.log("Add shelf error:", error);
      alert("Failed to add book to shelf.");
    } finally {
      setSavingBookId(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Explore Books</h1>
        <p className="mt-2 text-slate-600">
          Search books using the Open Library API.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 flex gap-3">
        <input
          type="text"
          placeholder="Search book name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
          Loading books...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
          No books found.
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => {
            const bookId = book.key.replace("/works/", "");

            return (
              <div
                key={book.key}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md"
              >
                <img
                  src={getCoverUrl(book.cover_i)}
                  alt={book.title}
                  className="h-72 w-full bg-slate-100 object-cover"
                />

                <div className="p-4">
                  <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
                    {book.title}
                  </h3>

                  <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                    {book.author_name?.join(", ") || "Unknown Author"}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Published: {book.first_publish_year || "N/A"}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/books/${bookId}`}
                      className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleAddShelf(book)}
                      disabled={savingBookId === bookId}
                      className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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