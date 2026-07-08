import React from 'react';
import Button from '../Button/Button';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 mt-6 font-sans text-xs text-text-secondary-base select-none">
      <span>Page <strong className="text-text-base">{currentPage}</strong> of <strong className="text-text-base">{totalPages}</strong></span>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5"
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
