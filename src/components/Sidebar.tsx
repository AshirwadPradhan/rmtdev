import { JobItem } from "../lib/types";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";

export default function Sidebar({ jobItems }: { jobItems: JobItem[] }) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <Sorting />
      </div>
      <JobList jobItems={jobItems} />
      <Pagination />
    </div>
  );
}
