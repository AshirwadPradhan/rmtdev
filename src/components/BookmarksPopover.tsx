import { forwardRef, useContext } from "react";
import JobList from "./JobList";
import { BookmarksContext } from "../context/BookmarksContextProvider";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkJobItems, loading } = useContext(BookmarksContext)!;
  return (
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkJobItems} loading={loading} />
    </div>
  );
});

export default BookmarksPopover;
