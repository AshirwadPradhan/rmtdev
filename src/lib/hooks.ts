import { useEffect, useState } from "react";
import { JobContent, JobItem } from "./types";

export function useJobItems(searchTerm: string): {
  jobItemsSliced: JobItem[];
  loading: boolean;
} {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

export function useActiveId() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveId(window.location.hash.slice(1));
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}

export function useJobItem(id: string | null) {
  const [jobItem, setJobItem] = useState<JobContent | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const resp = await fetch(
        "https://bytegrad.com/course-assets/projects/rmtdev/api/data/" + id
      );
      const data = await resp.json();
      setJobItem(data.jobItem);
    };
    fetchData();
  }, [id]);
  return jobItem;
}
