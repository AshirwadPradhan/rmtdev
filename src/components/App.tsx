import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm === "") return;

    const fetchData = async () => {
      const resp = await fetch(
        "https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=" +
          searchTerm
      );
      const data = await resp.json();
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <Background />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container jobItems={jobItems}/>
      <Footer />
    </>
  );
}

export default App;
