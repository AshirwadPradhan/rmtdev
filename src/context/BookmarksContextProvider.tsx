import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type BookmarksContextType = {
  bookmarkIds: string[];
  handleToggleBookmark: (id: string) => void;
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

  const handleToggleBookmark = (id: string) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarkIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
