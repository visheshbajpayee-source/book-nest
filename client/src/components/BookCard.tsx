import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  publishedYear: number;
  rating: number;
};

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-72 bg-slate-100 overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{book.author}</p>

        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <span>{book.publishedYear}</span>

          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {book.rating}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/books/${book.id}`}
            className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
          >
            Details
          </Link>

          <button className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50">
            Add Shelf
          </button>
        </div>
      </div>
    </div>
  );
}