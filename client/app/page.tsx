import Link from "next/link";

export default function HomePage() {
  return (
<section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#f8f5f2] px-4 dark:bg-[#d9c3b3]">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#c89b8a]/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-72 w-72 rounded-full bg-[#5b342b]/20 blur-3xl" />

      <div className="relative z-10 max-w-4xl text-center">
        <div className="inline-flex items-center rounded-full border border-[#d8ccc5] bg-white/70 px-5 py-2 text-sm font-medium text-[#5b342b] shadow-sm backdrop-blur-md dark:border-[#2a2a2a] dark:bg-[#181818]/80 dark:text-[#f5e9df]">
          Your Personal Reading Companion
        </div>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-[#2d1b16] sm:text-6xl lg:text-7xl dark:text-">
          Track Your Books.
          <br />
          Build Your Reading Habit.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/70">
          BookNest helps you discover books, organize your shelf,
          monitor reading progress, and create a better reading routine
          with a clean modern experience.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/books" 
          className="group rounded-2xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(91,52,43,0.25)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(91,52,43,0.35)] active:scale-95">
            Explore Books
          </Link>

          <Link
            href="/dashboard"
            className="group rounded-2xl bg-gradient-to-r from-[#9d6b61] to-[#74463a] px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(91,52,43,0.25)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(91,52,43,0.35)] active:scale-95"
          >
            Open Dashboard
          </Link>
        </div>

        <div className="mb-2 mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#d9c3b3] bg-[#e7ddd5] p-6 shadow-[0_10px_30px_rgba(91,52,43,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(91,52,43,0.18)]">           
            <h3 className="text-xl font-bold text-[#2d1b16] dark:text-black">
              Discover Books
            </h3>

            <p className="mt-3 text-sm leading-7 text-black/100">
              Search and explore books instantly using the Open Library API.
            </p>
          </div>

          <div className="rounded-3xl border border-[#d9c3b3] bg-[#e7ddd5] p-6 shadow-[0_10px_30px_rgba(91,52,43,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(91,52,43,0.18)]">
            <h3 className="text-xl font-bold text-[#2d1b16] dark:text-black">
              Manage Shelf
            </h3>

            <p className="mt-3 text-sm leading-7 text-black/100">
              Organize books into your personal reading shelf and lists.
            </p>
          </div>

          <div className="rounded-3xl border border-[#d9c3b3] bg-[#e7ddd5] p-6 shadow-[0_10px_30px_rgba(91,52,43,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(91,52,43,0.18)]">
            <h3 className="text-xl font-bold text-[#2d1b16] dark:text-black">
              Track Progress
            </h3>

            <p className="mt-3 text-sm leading-7 text-black/100">
              Stay consistent and monitor your reading journey easily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}