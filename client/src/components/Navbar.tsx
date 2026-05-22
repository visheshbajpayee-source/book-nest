"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("booknest_token");
    localStorage.removeItem("booknest_refresh_token");
    router.push("/login");
  };

  const closeMenu = () => setOpen(false);

  const linkClass =
    "px-2 py-2 rounded-lg transition-all duration-200 hover:bg-[#f3e8e3] hover:text-[#5b342b] hover:translate-x-1";

  const logoutClass =
    "text-left px-2 py-2 rounded-lg text-red-600 font-semibold transition-all duration-200 hover:bg-red-50 hover:translate-x-1";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#6e4a41] bg-[#5b342b]/95 backdrop-blur-xl shadow-[0_4px_18px_rgba(0,0,0,0.25)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
       <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
       <BookOpen className="h-6 w-6 text-white" />
       <span className="text-white">BookNest</span>
       </Link>

          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-white">

           
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/books">Books</Link>
            <Link href="/shelf">Shelf</Link>

            <Link href="/login" className="hover:underline">
              Login
            </Link>

            <Link href="/signup" className="hover:underline">
              Signup
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-400  px-5 py-2 text-white"
            >
              Logout
            </button>

          </div>
          <button onClick={() => setOpen(true)} className="md:hidden text-white" type="button" aria-label="Open menu">
            <Menu />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">

          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 text-[#5b342b] shadow-2xl">

            <button onClick={closeMenu} type="button" aria-label="Close menu" className="mb-8 text-[#5b342b]">
              <X />
            </button>

            <div className="flex flex-col gap-4 font-medium">

              <Link href="/dashboard" onClick={closeMenu} className={linkClass}>
                Dashboard
              </Link>

              <Link href="/books" onClick={closeMenu} className={linkClass}>
                Books
              </Link>

              <Link href="/shelf" onClick={closeMenu} className={linkClass}>
                Shelf
              </Link>

              <Link href="/login" onClick={closeMenu} className={linkClass}>
                Login
              </Link>

              <Link href="/signup" onClick={closeMenu} className={linkClass}>
                Signup
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className={logoutClass}
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}