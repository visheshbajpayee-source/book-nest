"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("booknest_token");
    localStorage.removeItem("booknest_refresh_token");

    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#6e4a41] bg-[#5b342b]/95 backdrop-blur-xl shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-bold text-white"
        >
          <BookOpen className="h-6 w-6 text-white" />
          BookNest
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-white">
          <Link href="/dashboard">Dashboard</Link>

          <Link href="/books">Books</Link>

          <Link href="/shelf">Shelf</Link>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}