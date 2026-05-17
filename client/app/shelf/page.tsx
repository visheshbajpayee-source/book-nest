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
    console.log("Shelf data:", data);
    setShelfBooks(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    loadShelfBooks();
  }, []);

  const handleRemove = (shelfId: string) => {
    removeBookFromShelf(shelfId);
    loadShelfBooks();
  };

  if (!mounted) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
        Loading shelf...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Shelf</h1>
          <p className="mt-2 text-slate-600">
            Books you added from Explore Books.
          </p>
        </div>

        <Link
          href="/books"
          className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Explore Books
        </Link>
      </div>

      {shelfBooks.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">No books in shelf</h2>

          <p className="mt-2 text-slate-500">
            Go to Explore Books and add some books.
          </p>
          <br></br>
          <Link
            href="/books"
            className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Explore Books
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shelfBooks.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <img
                src={item.book.cover}
                alt={item.book.title}
                className="h-72 w-full bg-slate-100 object-cover"
              />

              <div className="p-4">
                <h3 className="line-clamp-2 text-lg font-semibold">
                  {item.book.title}
                </h3>

                <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                  {item.book.author}
                </p>

                <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                  {item.book.description || "No description available."}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Published: {item.book.publishedYear}
                </p>

                <p className="mt-2 text-sm font-medium text-indigo-600">
                  Status: {item.status.replaceAll("_", " ")}
                </p>

             <div className="mt-4 flex gap-2">
                <Link
                  href={`/books/${item.book.id}`}
                  className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Details
                </Link>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="flex-1 rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
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