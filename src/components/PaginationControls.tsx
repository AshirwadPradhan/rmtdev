import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function Pagination({
  onClick,
  currentPage,
}: {
  onClick: (direction: "next" | "prev") => void;
  currentPage: number;
}) {
  return (
    <section className="pagination">
      <PageControl
        direction="prev"
        onClick={onClick}
        currentPage={currentPage}
      />
      <PageControl
        direction="next"
        onClick={onClick}
        currentPage={currentPage}
      />
    </section>
  );
}

function PageControl({
  direction,
  onClick,
  currentPage,
}: {
  direction: "next" | "prev";
  onClick: (direction: "next" | "prev") => void;
  currentPage: number;
}) {
  if (direction === "prev") {
    return (
      <button className="pagination__button" onClick={() => onClick(direction)}>
        <ArrowLeftIcon />
        {`Page ${currentPage - 1}`}
      </button>
    );
  }

  if (direction === "next") {
    return (
      <button className="pagination__button" onClick={() => onClick("next")}>
        {`Page ${currentPage + 1}`}
        <ArrowRightIcon />
      </button>
    );
  }
}
