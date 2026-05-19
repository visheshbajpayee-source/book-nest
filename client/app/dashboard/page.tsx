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
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
    }

    if (progress > 0) {
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300";
    }

    return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-500/20 dark:bg-slate-500/10 dark:text-slate-300";
  };

  if (!mounted) {
    return (
      <div className="rounded-[30px] border border-[#e7ddd5] bg-white p-10 text-center text-[#6b7280] shadow-lg dark:border-[#2a2a2a] dark:bg-[#181818] dark:text-slate-300">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-2 text-[#2e2e2e] dark:bg-[#111111] dark:text-white">
      <div className="mb-10 flex items-center justify-between gap-5 max-md:flex-col max-md:items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#5b342b] dark:text-[#f5e9df]">
            Dashboard
          </h1>

          <p className="mt-3 text-[#6b7280] dark:text-slate-400">
            Track your books, reading status, and progress.
          </p>
        </div>

        <Link
          href="/books"
          className="rounded-2xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-6 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(91,52,43,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(91,52,43,0.4)] active:scale-95"
        >
          Explore Books
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Books in Shelf"
          value={totalBooks}
          className="rounded-[30px] border-0  bg-white text-white shadow-[0_12px_30px_rgba(91,52,43,0.25)] transition-all duration-300 hover:-translate-y-2"
        />

        <StatCard
          title="Currently Reading"
          value={getPercentage(currentlyReadingCount)}
          description={`${currentlyReadingCount} of ${totalBooks} books`}
          className="rounded-[30px] border border-[#e7ddd5] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-[#2a2a2a] dark:bg-[#181818]"
        />

        <StatCard
          title="Completed"
          value={getPercentage(completedCount)}
          description={`${completedCount} of ${totalBooks} books`}
          className="rounded-[30px] border border-[#e7ddd5] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-[#2a2a2a] dark:bg-[#181818]"
        />

        <StatCard
          title="Pending"
          value={getPercentage(pendingCount)}
          description={`${pendingCount} of ${totalBooks} books`}
          className="rounded-[30px] border border-[#e7ddd5] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-[#2a2a2a] dark:bg-[#181818]"
        />
      </div>

      <section className="mt-12">
        <div className="mb-6 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <div>
<<<<<<< HEAD
            <h2 className="text-2xl font-semibold">Book Progress</h2>
            <p className="mt-1 text-slate-600">
              Showing progress for books from your shelf.
=======
            <h2 className="text-3xl font-bold text-[#5b342b] dark:text-[#f5e9df]">
              Book Progress
            </h2>

            <p className="mt-2 text-[#6b7280] dark:text-slate-400">
              Showing progress for 2 books from your shelf.
>>>>>>> 11e4c7bff7acb5cd86f83455249510316a7b18c0
            </p>
          </div>

          <Link
            href="/shelf"
            className="font-semibold text-[#5b342b] transition-all duration-300 hover:translate-x-1 hover:underline dark:text-[#c89b8a]"
          >
            View all shelf →
          </Link>
        </div>

        {progressBooks.length === 0 ? (
          <div className="rounded-[32px] border border-[#e7ddd5] bg-white p-12 text-center shadow-xl dark:border-[#2a2a2a] dark:bg-[#181818]">
            <h3 className="text-2xl font-bold text-[#5b342b] dark:text-[#f5e9df]">
              No books added yet
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-[#6b7280] dark:text-slate-400">
              Your dashboard is empty because your shelf has no books. Add books
              from Explore Books to see progress here.
            </p>

            <div className="mt-8 flex justify-center gap-4 max-sm:flex-col">
              <Link
                href="/books"
                className="rounded-2xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Explore Books
              </Link>

              <Link
                href="/shelf"
                className="rounded-2xl border border-[#d8d0c8] bg-[#faf7f5] px-6 py-3 font-semibold text-[#5b342b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f1ebe6] dark:border-[#333] dark:bg-[#1f1f1f] dark:text-[#f5e9df]"
              >
                Open Shelf
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {progressBooks.map((item) => {
              const statusText = getReadableStatus(item.progress);
              const statusClass = getStatusClass(item.progress);

              return (
                <div
                  key={item.id}
                  className="group rounded-[32px] border border-[#e7ddd5] bg-white p-5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-[#2a2a2a] dark:bg-[#181818]"
                >
                  <div className="flex gap-5">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="h-32 w-24 rounded-2xl object-cover shadow-md transition-all duration-500 group-hover:scale-105"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="line-clamp-2 text-xl font-bold text-[#2e2e2e] dark:text-white">
                            {item.book.title}
                          </h3>

                          <p className="mt-1 text-sm text-[#6b7280] dark:text-slate-400">
                            {item.book.author}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-4 py-1 text-xs font-bold ${statusClass}`}
                        >
                          {statusText}
                        </span>
                      </div>

                      <p className="mt-5 text-sm font-semibold text-[#5b342b] dark:text-[#c89b8a]">
                        {item.progress}% complete
                      </p>

                      <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#ece5df] dark:bg-[#2a2a2a]">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-[#5b342b] to-[#8b5a4d] transition-all duration-700"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>

                      <div className="mt-5 flex gap-3">
                        <Link
                          href={`/books/${item.book.id}`}
                          className="rounded-xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
                        >
                          Details
                        </Link>

                        <Link
                          href="/shelf"
                          className="rounded-xl border border-[#d8d0c8] bg-[#faf7f5] px-5 py-2 text-sm font-semibold text-[#5b342b] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f1ebe6] dark:border-[#333] dark:bg-[#1f1f1f] dark:text-[#f5e9df]"
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
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-medium text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
            Only 1 book is available. Add one more book from Explore Books to
            show 2 books.
          </div>
        )}
      </section>
    </div>
  );
}