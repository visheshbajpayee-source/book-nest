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
