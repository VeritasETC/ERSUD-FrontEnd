import React, { useEffect } from "react";
import "./pagination.css";

const Pagination = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      onPageChange(parseInt(storedPage));
    }
  }, []);

  const handlePageChange = (page) => {
    onPageChange(page);
    localStorage.setItem("currentPage", page);
  };

  const pageRange = () => {
    const range = [];
    const delta = 2;

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="pagination_2">
      <button
        className="pg-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &laquo;
      </button>
      {pageRange().map((page, index) => (
        <h6 className="panginate" key={index}>
          <button
            onClick={() => handlePageChange(page)}
            disabled={totalPages === 0}
            className={`${(page ?? 0) === currentPage ? "active2" : "mainbtn"} ${page === "..." ? "ellipsis" : ""
              } ${page === totalPages ? "last" : ""}`}
          >
            {page}
          </button>
        </h6>
      ))}
      <button
        className="pg-btn"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
