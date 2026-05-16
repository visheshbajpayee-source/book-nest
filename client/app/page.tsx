import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid min-h-[75vh] place-items-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Track your books. Build your reading habit.
        </h1>

        <p className="mt-5 text-lg text-slate-600">
          BookNest is a personal book tracker where users can search books,
          manage bookshelves, write reviews, create reading lists, and monitor
          reading progress.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/books"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Explore Books
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium hover:bg-slate-100"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}