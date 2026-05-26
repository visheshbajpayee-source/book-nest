import { Book, ShelfBook, ShelfStatus } from "@/types";

const SHELF_KEY = "booknest_shelf";

export function getShelfBooks(): ShelfBook[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(SHELF_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addBookToShelf(
  book: Book,
  status: ShelfStatus = "want_to_read"
) {
  const shelfBooks = getShelfBooks();

  const alreadyExists = shelfBooks.some((item) => item.book.id === book.id);

  if (alreadyExists) {
    return {
      success: false,
      message: "Book already exists in shelf.",
    };
  }

  const newShelfBook: ShelfBook = {
    id: crypto.randomUUID(),
    book,
    status,
    progress: status === "finished" ? 100 : 0,
  };

  const updatedShelf = [...shelfBooks, newShelfBook];

  localStorage.setItem(SHELF_KEY, JSON.stringify(updatedShelf));

  return {
    success: true,
    message: "Book added to shelf.",
  };
}

export function removeBookFromShelf(shelfId: string) {
  const shelfBooks = getShelfBooks();

  const updatedShelf = shelfBooks.filter((item) => item.id !== shelfId);

  localStorage.setItem(SHELF_KEY, JSON.stringify(updatedShelf));
}