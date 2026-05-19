"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import { ShelfBook } from "@/types";
import { getShelfBooks } from "@/lib/shelfstorage";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [shelfBooks, setShelfBooks] = useState<ShelfBook[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setShelfBooks(getShelfBooks());
  }, []);

  const progressBooks = shelfBooks.slice(0, 2);
  const totalBooks = shelfBooks.length;

  const currentlyReadingCount = shelfBooks.filter(
    (item) => item.progress > 0 && item.progress < 100
  ).length;

  const completedCount = shelfBooks.filter(
    (item) => item.progress >= 100
  ).length;

  const pendingCount = shelfBooks.filter(
    (item) => item.progress === 0
  ).length;

  const getPercentage = (count: number) => {
    if (totalBooks === 0) return "0%";
    return `${Math.round((count / totalBooks) * 100)}%`;
  };

  const getReadableStatus = (progress: number) => {
    if (progress >= 100) return "Completed";
    if (progress > 0) return "In Progress";
    return "Pending";
  };

  const getStatusClass = (progress: number) => {
    if (progress >= 100) {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (progress > 0) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }

    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  if (!mounted) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Track your books, reading status, and progress.
          </p>
        </div>

        <Link
          href="/books"
          className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Explore Books
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard title="Books in Shelf" value={totalBooks} />

        <StatCard
          title="Currently Reading"
          value={getPercentage(currentlyReadingCount)}
          description={`${currentlyReadingCount} of ${totalBooks} books`}
        />

        <StatCard
          title="Completed"
          value={getPercentage(completedCount)}
          description={`${completedCount} of ${totalBooks} books`}
        />

        <StatCard
          title="Pending"
          value={getPercentage(pendingCount)}
          description={`${pendingCount} of ${totalBooks} books`}
        />
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Book Progress</h2>
            <p className="mt-1 text-slate-600">
              Showing progress for books from your shelf.
            </p>
          </div>

          <Link
            href="/shelf"
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            View all shelf
          </Link>
        </div>

        {progressBooks.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold">No books added yet</h3>

            <p className="mt-2 text-slate-500">
              Your dashboard is empty because your shelf has no books. Add books
              from Explore Books to see progress here.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/books"
                className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
              >
                Explore Books
              </Link>

              <Link
                href="/shelf"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium hover:bg-slate-50"
              >
                Open Shelf
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {progressBooks.map((item) => {
              const statusText = getReadableStatus(item.progress);
              const statusClass = getStatusClass(item.progress);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="h-28 w-20 shrink-0 rounded-lg bg-slate-100 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                            {item.book.title}
                          </h3>

                          <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                            {item.book.author}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
                        >
                          {statusText}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-medium text-slate-700">
                        {item.progress}% complete
                      </p>

                      <div className="mt-2 h-2 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-indigo-600"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/books/${item.book.id}`}
                          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                          Details
                        </Link>

                        <Link
                          href="/shelf"
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                        >
                          Update
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {progressBooks.length === 1 && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            Only 1 book is available. Add one more book from Explore Books to
            show 2 books.
          </div>
        )}
      </section>
    </div>
  );
}