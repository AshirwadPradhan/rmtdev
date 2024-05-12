import { createContext, useState } from "react";

export const BookmarksContext = createContext({});

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);

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
