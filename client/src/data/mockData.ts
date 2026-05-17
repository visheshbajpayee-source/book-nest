export type ShelfStatus = "want_to_read" | "currently_reading" | "finished";

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  publishedYear: number;
  description: string;
  rating: number;
  pages: number;
  genres: string[];
};

export type ShelfBook = {
  id: string;
  book: Book;
  status: ShelfStatus;
  progress: number;
};

export const books: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    publishedYear: 2018,
    description:
      "A practical guide to building good habits and breaking bad ones with tiny behavior changes.",
    rating: 4.8,
    pages: 320,
    genres: ["Self-help", "Productivity", "Psychology"],
  },
  {
    id: "2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    publishedYear: 2020,
    description:
      "Short stories and lessons on wealth, greed, and happiness from one of today’s best financial writers.",
    rating: 4.7,
    pages: 256,
    genres: ["Finance", "Behavioral Economics", "Memoir"],
  },
  {
    id: "3",
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
    publishedYear: 2016,
    description:
      "Rules for focused success in a distracted world so you can work smarter and get more done.",
    rating: 4.6,
    pages: 304,
    genres: ["Productivity", "Business", "Self-improvement"],
  },
  {
    id: "habits-of-highly-effective-people",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
    publishedYear: 1989,
    description:
      "A timeless framework for personal and professional effectiveness through principled living.",
    rating: 4.5,
    pages: 381,
    genres: ["Leadership", "Self-help", "Motivation"],
  },
];

export const shelfBooks: ShelfBook[] = [
  {
    id: "shelf-1",
    book: books[0],
    status: "currently_reading",
    progress: 45,
  },
  {
    id: "shelf-2",
    book: books[1],
    status: "want_to_read",
    progress: 0,
  },
  {
    id: "shelf-3",
    book: books[2],
    status: "finished",
    progress: 100,
  },
];
