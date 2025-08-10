/* Styles for ProductCard.jsx */
import React from 'react';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';

const ProductCard = ({ product, viewProduct, isFeatured = false }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="star filled" />
        ) : (
          <FaRegStar key={i} className="star" />
        )
      );
    }
    return stars;
  };

  return (
    <div className={`product-card ${isFeatured ? 'featured' : 'minimal'}`}>
      <div className="product-badge">
        {product.isNew && <span className="new-badge">New</span>}
        <span className="discount-badge">
          {Math.round(((product.discount - product.price) / product.discount) * 100)}% Off
        </span>
      </div>
      <div className="product-image">
        <img src={product.images[0]} alt={product.name} />
        <div className="product-actions">
          <button className="action-btn wishlist">
            <FaHeart />
          </button>
          <button className="action-btn cart">
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="price-container">
          <span className="current-price">${product.price.toFixed(2)}</span>
          <span className="original-price">${product.discount.toFixed(2)}</span>
        </div>
        <div className="rating">{renderStars(product.rating)}</div>
        <button 
          className="view-product-btn"
          onClick={() => viewProduct(product)}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;