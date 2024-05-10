export function JobList({ jobItems }: { jobItems: JobItem[] }) {
  return (
    <ul className="job-list">{jobItems.map((jobItem) => jobItem.title)}</ul>
  );
}

export default JobList;
