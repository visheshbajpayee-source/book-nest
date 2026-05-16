/* eslint-disable @next/next/no-img-element */
import { books } from "../../../src/data/mockData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default function BookDetailPage({ params }: Props) {
  const book = books.find((item) => item.id === params.id);

  if (!book) {
    notFound();
  }

  return (
    <div>
      <Link href="/books" className="text-sm font-medium text-indigo-600">
        ← Back to books
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <img
            src={book.cover}
            alt={book.title}
            className="h-120 w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="mt-2 text-lg text-slate-600">by {book.author}</p>

          <div className="mt-4 flex items-center gap-4 text-slate-600">
            <span>{book.publishedYear}</span>
            <span>{book.pages} pages</span>
            <span className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              {book.rating}
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            {book.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-3xl leading-7 text-slate-700">
            {book.description}
          </p>

          <div className="mt-8 flex gap-3">
            <button className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700">
              Add to Shelf
            </button>

            <button className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium hover:bg-slate-50">
              Write Review
            </button>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Community Reviews</h2>

        <div className="mt-5 space-y-5">
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Jayesh</h3>
              <span className="text-sm text-amber-500">★★★★★</span>
            </div>
            <p className="mt-2 text-slate-600">
              Useful book with practical advice. Good for habit building.
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Priya</h3>
              <span className="text-sm text-amber-500">★★★★☆</span>
            </div>
            <p className="mt-2 text-slate-600">
              Simple and easy to understand. Examples are clear.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}