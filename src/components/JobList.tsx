import { useActiveId } from "../lib/hooks";
import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  loading,
}: {
  jobItems: JobItem[] | undefined;
  loading: boolean;
}) {
  const activeId = useActiveId();
  return (
    <ul className="job-list">
      {loading && <Spinner />}
      {!loading &&
        jobItems?.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
