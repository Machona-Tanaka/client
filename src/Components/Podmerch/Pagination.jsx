/* Styles for Pagination.jsx */
import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="pagination">
      <button 
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination-button ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
      
      <button 
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;