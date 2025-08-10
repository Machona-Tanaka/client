/* Styles for ProductsGrid.jsx */
import React from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = ({ products, viewProduct, isFeatured = false }) => {
  return (
    <div className={`products-grid ${isFeatured ? 'featured' : 'minimal'}`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewProduct={viewProduct} 
          isFeatured={isFeatured}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;