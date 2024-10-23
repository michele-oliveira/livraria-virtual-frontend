import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3; 

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(
      totalPages,
      currentPage + Math.floor(maxPagesToShow / 2)
    );

    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`mx-1 px-3 py-1 border rounded bg-white text-slate-600 border-slate-600 hover:bg-slate-600 hover:text-white transition`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots-start" className="mx-1">
            ...
          </span>
        );
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 px-3 py-1 border rounded ${
            i === currentPage
              ? "bg-slate-600 text-white"
              : "bg-white text-slate-600 border-slate-600"
          } hover:bg-slate-600 hover:text-white transition`}
        >
          {i}
        </button>
      );
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots-end" className="mx-1">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`mx-1 px-3 py-1 border rounded bg-white text-slate-600 border-slate-600 hover:bg-slate-600 hover:text-white transition`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-l ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-white text-slate-600 border-slate-600 hover:bg-slate-600 hover:text-white transition"
        }`}
      >
        Anterior
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-r ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-white text-slate-600 border-slate-600 hover:bg-slate-600 hover:text-white transition"
        }`}
      >
        Próxima
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
