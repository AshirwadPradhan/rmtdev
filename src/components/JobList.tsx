import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  loading,
}: {
  jobItems: JobItem[];
  loading: boolean;
}) {
  return (
    <ul className="job-list">
      {loading && <Spinner />}
      {!loading && jobItems.map((jobItem) => <JobListItem jobItem={jobItem} />)}
    </ul>
  );
}

export default JobList;
