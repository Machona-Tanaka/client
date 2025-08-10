import React from 'react';
import { FaSearch, FaFrown } from 'react-icons/fa';

const ErrorComponent = ({ searchQuery, onClearSearch }) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <FaFrown size={48} />
      </div>
      <h2 className="error-title">No Results Found</h2>
      <p className="error-message">
        We couldn't find any matches for <span className="search-query">"{searchQuery}"</span>
      </p>
      <div className="error-suggestions">
        <p>Try adjusting your search:</p>
        <ul>
          <li>Check your spelling</li>
          <li>Use more generic terms</li>
          <li>Try different keywords</li>
        </ul>
      </div>
      <button 
        className="clear-search-btn"
        onClick={onClearSearch}
      >
        <FaSearch className="search-icon" />
        Clear Search & Try Again
      </button>
    </div>
  );
};

export default ErrorComponent;