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
import { useActiveId, useJobItem, useJobItems } from "../lib/hooks";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { jobItemsSliced, loading, totalJobCount } = useJobItems(searchTerm);
  const activeId = useActiveId();
  const [jobItem, jobloading] = useJobItem(activeId);

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
            <Sorting />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} loading={loading} />
          <Pagination />
        </Sidebar>
        <JobItemContent jobItem={jobItem} jobloading={jobloading} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
