import { createContext, useEffect, useState } from "react";

export const BookmarksContext = createContext({});

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const bookarksFromLocalStorage = JSON.parse(
    localStorage.getItem("bookmarks") || "[]"
  );
  const [bookmarkIds, setBookmarkIds] = useState<string[]>(
    bookarksFromLocalStorage
  );

  const handleToggleBookmark = (id: string) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkIds));
  }, [bookmarkIds]);

  return (
    <BookmarksContext.Provider value={{ bookmarkIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
