import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItem } from "../lib/types";

type BookmarksContextType = {
  bookmarkIds: string[];
  handleToggleBookmark: (id: string) => void;
  bookmarkJobItems: JobItem[];
  loading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<string[]>(
    "bookmarks",
    []
  );

  const { jobItems: bookmarkJobItems, loading } = useJobItems(bookmarkIds);

  const handleToggleBookmark = (id: string) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarkIds, handleToggleBookmark, bookmarkJobItems, loading }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
