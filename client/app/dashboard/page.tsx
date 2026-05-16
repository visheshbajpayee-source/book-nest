import StatCard from "@/components/StatCard";
import { books, shelfBooks } from "@/data/mockData";
import BookCard from "@/components/BookCard";

export default function DashboardPage() {
  const currentlyReading = shelfBooks.filter(
    (item) => item.status === "currently_reading"
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Your reading progress, current books, and recent activity.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard title="Books Read" value={12} description="This year" />
        <StatCard title="Currently Reading" value={currentlyReading.length} />
        <StatCard title="Reviews" value={8} />
        <StatCard title="Average Rating" value="4.6" />
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Currently Reading</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentlyReading.map((item) => (
            <BookCard key={item.id} book={item.book} />
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Recent Activity</h2>

        <div className="mt-4 space-y-3 text-slate-600">
          <p>You added Atomic Habits to Currently Reading.</p>
          <p>You finished The Psychology of Money.</p>
          <p>You wrote a review for Deep Work.</p>
        </div>
      </section>
    </div>
  );
}