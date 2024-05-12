import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import Pagination from "./PaginationControls";
import JobList from "./JobList";
import Sorting from "./SortingControls";
import ResultsCount from "./ResultsCount";
import {
  useActiveId,
  useDebounce,
  useJobItem,
  useJobItems,
} from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { SortBy } from "../lib/types";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 300);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const { jobItems, loading } = useJobItems(debouncedSearchTerm);
  const jobItemsSorted = jobItems.sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    }
    return 0;
  });
  const jobItemsSliced = jobItemsSorted.slice(
    (currentPage - 1) * 7,
    currentPage * 7
  );
  const totalJobCount = jobItems.length || 0;
  const totalNoOfPages = Math.ceil(totalJobCount / 7);

  const activeId = useActiveId();
  const { jobItem, isLoading: jobloading } = useJobItem(activeId);

  const handleChangePage = (direction: "next" | "prev") => {
    if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={totalJobCount} />
            <Sorting onClick={handleChangeSortBy} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} loading={loading} />
          <Pagination
            onClick={handleChangePage}
            currentPage={currentPage}
            totalPages={totalNoOfPages}
          />
        </Sidebar>
        <JobItemContent jobItem={jobItem} jobloading={jobloading} />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
