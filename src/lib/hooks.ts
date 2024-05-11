import { useEffect, useState } from "react";
import { JobContent, JobItem } from "./types";

export function useJobItems(searchTerm: string): {
  jobItemsSliced: JobItem[];
  loading: boolean;
  totalJobCount: number;
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

  return { jobItemsSliced, loading, totalJobCount: jobItems.length };
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchData = async () => {
      const resp = await fetch(
        "https://bytegrad.com/course-assets/projects/rmtdev/api/data/" + id
      );
      const data = await resp.json();
      setJobItem(data.jobItem);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  return [jobItem, loading] as const;
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
