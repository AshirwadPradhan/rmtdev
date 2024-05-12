import { useEffect, useState } from "react";
import { JobContent, JobItem } from "./types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// export function useJobItems(searchTerm: string): {
//   jobItems: JobItem[];
//   loading: boolean;
// } {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (searchTerm === "") return;
//     setLoading(true);

//     const fetchData = async () => {
//       const resp = await fetch(
//         "https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=" +
//           searchTerm
//       );
//       const data = await resp.json();
//       setLoading(false);
//       setJobItems(data.jobItems);
//     };
//     fetchData();
//   }, [searchTerm]);

//   return { jobItems, loading };
// }

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchTerm: string
): Promise<JobItemsApiResponse> => {
  const resp = await fetch(
    "https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=" +
      searchTerm
  );
  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.description);
  }
  const data = await resp.json();
  return data;
};

export function useJobItems(searchTerm: string): {
  jobItems: JobItem[];
  loading: boolean;
} {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchTerm],
    () => (searchTerm ? fetchJobItems(searchTerm) : null),
    {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchTerm,
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );
  return { jobItems: data?.jobItems || [], loading: isInitialLoading };
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

// export function useJobItem(id: string | null) {
//   const [jobItem, setJobItem] = useState<JobContent | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     const fetchData = async () => {
//       const resp = await fetch(
//         "https://bytegrad.com/course-assets/projects/rmtdev/api/data/" + id
//       );
//       const data = await resp.json();
//       setJobItem(data.jobItem);
//       setLoading(false);
//     };
//     fetchData();
//   }, [id]);
//   return [jobItem, loading] as const;
// }

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobContent;
};

const fetchJobItem = async (id: string): Promise<JobItemApiResponse> => {
  const resp = await fetch(
    "https://bytegrad.com/course-assets/projects/rmtdev/api/data/" + id
  );
  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.description);
  }
  const data = await resp.json();
  return data;
};

export function useJobItem(id: string | null) {
  const { data, isInitialLoading } = useQuery(
    ["jobItem", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );
  return { jobItem: data?.jobItem, isLoading: isInitialLoading };
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || `${initialValue}`)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
