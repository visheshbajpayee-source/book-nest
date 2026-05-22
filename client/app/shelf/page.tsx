"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShelfBook } from "@/types";
import { getShelfBooks, removeBookFromShelf } from "@/lib/shelfstorage";

export default function ShelfPage() {
  const [mounted, setMounted] = useState(false);
  const [shelfBooks, setShelfBooks] = useState<ShelfBook[]>([]);

  const loadShelfBooks = () => {
    const data = getShelfBooks();
    setShelfBooks(data);
  };

  useEffect(() => {
    setMounted(true);
    loadShelfBooks();
  }, []);

  const handleRemove = (shelfId: string) => {
    removeBookFromShelf(shelfId);
    loadShelfBooks();
  };

  const getStatusStyles = (status: string) => {
    if (status === "completed") {
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    if (status === "currently_reading") {
      return "border-[#c7b1a5] bg-[#f3ebe7] text-[#5b342b]";
    }

    return "border-amber-200 bg-amber-50 text-amber-700";
  };

  if (!mounted) {
    return (
      <div className="rounded-[30px] border border-[#e7ddd5] bg-white p-10 text-center text-[#6b7280] shadow-lg">
        Loading shelf...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-2">
      <div className="mb-10 rounded-[32px] border border-[#e7ddd5] bg-white p-7 shadow-xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#5b342b]">
              My Shelf
            </h1>

            <p className="mt-3 text-[#6b7280]">
              Books you added from Explore Books.
            </p>
          </div>

          <Link
            href="/books"
            className="rounded-2xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(91,52,43,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(91,52,43,0.4)] active:scale-95"
          >
            Explore Books
          </Link>
        </div>
      </div>

      {shelfBooks.length === 0 ? (
        <div className="rounded-[32px] border border-[#e7ddd5] bg-white p-12 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-[#5b342b]">
            No books in shelf
          </h2>

          <p className="mt-3 text-[#6b7280]">
            Go to Explore Books and add some books.
          </p>

          <Link
            href="/books"
            className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Explore Books
          </Link>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shelfBooks.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-[32px] border border-[#e7ddd5] bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="overflow-hidden">
                <img
                  src={item.book.cover}
                  alt={item.book.title}
                  className="h-80 w-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="line-clamp-2 text-xl font-bold text-[#2e2e2e]">
                      {item.book.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#6b7280]">
                      {item.book.author}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center rounded-full border px-4 py-1 text-xs font-bold capitalize tracking-wide ${getStatusStyles(
                      item.status
                    )}`}
                  >
                    {item.status.replaceAll("_", " ")}
                  </span>
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#6b7280]">
                  {item.book.description || "No description available."}
                </p>

                <p className="mt-5 text-sm font-medium text-[#5b342b]">
                  Published: {item.book.publishedYear}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/books/${item.book.id}`}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#5b342b] to-[#74463a] px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
                  >
                    Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-all duration-300 hover:-translate-y-1 hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}