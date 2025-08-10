/* Styles for SearchSection.jsx */
import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  clearSearch, 
  activeFilter, 
  setActiveFilter 
}) => {
  return (
    <div className="search-section">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products, categories, or brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="clear-search" onClick={clearSearch}>
              &times;
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="filter-options">
        <button
          className={`filter-button ${activeFilter === 'latest' ? 'active' : ''}`}
          onClick={() => setActiveFilter('latest')}
        >
          Latest
        </button>
        <button
          className={`filter-button ${activeFilter === 'popular' ? 'active' : ''}`}
          onClick={() => setActiveFilter('popular')}
        >
          Popular
        </button>
        <button
          className={`filter-button ${activeFilter === 'discount' ? 'active' : ''}`}
          onClick={() => setActiveFilter('discount')}
        >
          On Discount
        </button>
        <div className="advanced-filter">
          <FaFilter />
          <span>More Filters</span>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;