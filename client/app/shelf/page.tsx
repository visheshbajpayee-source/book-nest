"use client";

import { useState } from "react";
import { ShelfBook, ShelfStatus } from "@/types";
import BookCard from "@/components/BookCard";

type Props = {
  items: ShelfBook[];
};

const tabs: { label: string; value: ShelfStatus }[] = [
  {
    label: "Want to Read",
    value: "want_to_read",
  },
  {
    label: "Currently Reading",
    value: "currently_reading",
  },
  {
    label: "Finished",
    value: "finished",
  },
];

export default function ShelfTabs({ items }: Props) {
  const [activeTab, setActiveTab] = useState<ShelfStatus>("currently_reading");

  const filteredItems = items.filter((item) => item.status === activeTab);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${
              activeTab === tab.value
                ? "bg-indigo-600 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
          No books in this shelf.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div key={item.id}>
              <BookCard book={item.book} />

              <div className="mt-3 rounded-xl border bg-white p-4">
                <p className="text-sm font-medium text-slate-700">
                  Progress: {item.progress}%
                </p>

                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}