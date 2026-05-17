export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  publishedYear: number | string;
  description?: string;
  rating?: number;
  pages?: number | string;
  genres?: string[];
};

export type ShelfStatus = "want_to_read" | "currently_reading" | "finished";

export type ShelfBook = {
  id: string;
  book: Book;
  status: ShelfStatus;
  progress: number;
};