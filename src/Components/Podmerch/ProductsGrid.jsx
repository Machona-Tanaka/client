/* Styles for ProductsGrid.jsx */
import React from 'react';
import ProductCard from './ProductCard';
import { FaExclamationTriangle, FaSearch } from 'react-icons/fa';

const ProductsGrid = ({ 
  products, 
  viewProduct,
  addToCart, 
  Url,
  isFeatured = false,
  isLoading = false,
  error = null
}) => {

  // Loading state
  if (isLoading) {
    return (
      <div className="products-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="products-grid-error">
        <FaExclamationTriangle className="error-icon" />
        <h3>Unable to load products</h3>
        <p>{error.message || 'Please try again later'}</p>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="products-grid-empty">
        <FaSearch className="empty-icon" />
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  // Normal state
  return (
    <div className={`products-grid ${isFeatured ? 'featured' : 'minimal'}`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewProduct={viewProduct} 
          isFeatured={isFeatured}
          addToCart = {addToCart}
          ImageUrl={Url}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;