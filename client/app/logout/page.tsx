"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("booknest_token");
    localStorage.removeItem("booknest_refresh_token");
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-xl rounded-4xl border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-slate-900">You are logged out</h1>
        <p className="mt-4 text-slate-600">
          Your session has been ended. You can log back in anytime to continue
          tracking your reading progress.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
          >
            Login again
          </button>

          <Link
            href="/books"
            className="rounded-xl border border-slate-300 px-6 py-3 text-center text-slate-700 transition hover:bg-slate-100"
          >
            Browse books
          </Link>
        </div>
      </div>
    </div>
  );
}
