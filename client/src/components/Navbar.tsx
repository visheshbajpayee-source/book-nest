import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          BookNest
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-slate-700">
          <Link href="/dashboard" className="hover:text-indigo-600">
            Dashboard
          </Link>
          <Link href="/books" className="hover:text-indigo-600">
            Books
          </Link>
          <Link href="/shelf" className="hover:text-indigo-600">
            Shelf
          </Link>
          <Link href="/login" className="hover:text-indigo-600">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}