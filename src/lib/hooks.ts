import { useEffect, useState } from "react";
import { JobItem } from "./types";

export function useJobItems(searchTerm: string): {
  jobItemsSliced: JobItem[];
  loading: boolean;
} {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (searchTerm === "") return;
    setLoading(true);

    const fetchData = async () => {
      const resp = await fetch(
        "https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=" +
          searchTerm
      );
      const data = await resp.json();
      setLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchTerm]);

  return { jobItemsSliced, loading };
}
