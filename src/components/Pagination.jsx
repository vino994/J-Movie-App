import React from "react";

export default function Pagination({ currentPage, totalResults, onPageChange }) {
  const totalPages = Math.ceil(totalResults / 10);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? "bg-white/10 cursor-not-allowed"
            : "bg-white/20 hover:bg-white/30"
        }`}
      >
        Prev
      </button>
      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? "bg-white/10 cursor-not-allowed"
            : "bg-white/20 hover:bg-white/30"
        }`}
      >
        Next
      </button>
    </div>
  );
}
