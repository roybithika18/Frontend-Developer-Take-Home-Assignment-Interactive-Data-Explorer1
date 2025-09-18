import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="d-flex justify-content-center mt-3">
      {/* Previous button */}
      <button
        className="btn btn-outline-primary mx-1"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {/* Page numbers */}
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next button */}
      <button
        className="btn btn-outline-primary mx-1"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
