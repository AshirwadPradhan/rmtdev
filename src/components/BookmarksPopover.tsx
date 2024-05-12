import { useContext } from "react";
import JobList from "./JobList";
import { BookmarksContext } from "../context/BookmarksContextProvider";

export default function BookmarksPopover() {
  const { bookmarkJobItems, loading } = useContext(BookmarksContext)!;
  return (
    <div className="bookmarks-popover">
      <JobList jobItems={bookmarkJobItems} loading={loading} />
    </div>
  );
}
