import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";

export default function Pagination({
  onClick,
  currentPage,
  totalPages,
}: {
  onClick: (direction: PageDirection) => void;
  currentPage: number;
  totalPages: number;
}) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PageControl
          direction="prev"
          onClick={onClick}
          currentPage={currentPage}
        />
      )}
      {currentPage < totalPages && (
        <PageControl
          direction="next"
          onClick={onClick}
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

function PageControl({
  direction,
  onClick,
  currentPage,
}: {
  direction: PageDirection;
  onClick: (direction: PageDirection) => void;
  currentPage: number;
}) {
  if (direction === "prev") {
    return (
      <button
        className="pagination__button pagination__button--previous"
        onClick={(e) => {
          onClick(direction);
          e.currentTarget.blur();
        }}
      >
        <ArrowLeftIcon />
        {`Page ${currentPage - 1}`}
      </button>
    );
  }

  if (direction === "next") {
    return (
      <button
        className="pagination__button pagination__button--next"
        onClick={(e) => {
          onClick("next");
          e.currentTarget.blur();
        }}
      >
        {`Page ${currentPage + 1}`}
        <ArrowRightIcon />
      </button>
    );
  }
}
