export type OpenLibrarySearchResult = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

export const getOpenLibraryCover = (coverId?: number) => {
  if (!coverId) {
    return "https://placehold.co/300x450?text=No+Cover";
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
};

export const searchOpenLibraryBooks = async (query: string) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`
  );
  if (!response.ok) {
    throw new Error("Failed to search Open Library");
  }

  const data = await response.json();
  return data.docs as OpenLibrarySearchResult[];
};

export const fetchOpenLibraryBookDetails = async (openLibraryId: string) => {
  const response = await fetch(
    `https://openlibrary.org/works/${openLibraryId}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Open Library book details");
  }

  return (await response.json()) as Record<string, any>;
};
