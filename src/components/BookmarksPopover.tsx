import { forwardRef, useContext } from "react";
import JobList from "./JobList";
import { BookmarksContext } from "../context/BookmarksContextProvider";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkJobItems, loading } = useContext(BookmarksContext)!;
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkJobItems} loading={loading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
