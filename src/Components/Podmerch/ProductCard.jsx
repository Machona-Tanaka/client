/* Styles for ProductCard.jsx */
import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';

const ProductCard = ({ product, viewProduct, ImageUrl,addToCart, isFeatured = false }) => {

  const [successMessage, setSuccessMessage] = useState('');

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

  const handleAddToCart = (product) => {
      addToCart(product);
      setSuccessMessage('Product added to cart successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear message after 3 seconds
  }


  return (
    <div className={`product-card ${isFeatured ? 'featured' : 'minimal'}`}>
      <div className="product-badge">
        {product.isNew && <span className="new-badge">New</span>}
        {product.discount > 0 && 
          <span className="discount-badge">
            {(product.discount_rate)}% Off
          </span>
        }

      </div>
      
      <div className="product-image">
        <img src={ImageUrl + product.images[0]} alt={product.name} />
        <div className="product-actions">
          <button className="action-btn wishlist">
            <FaHeart />
          </button>
          <button className="action-btn cart" onClick={handleAddToCart.bind(null, product)}>
            <FaShoppingCart />
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="price-container">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.discount > 0 && 
                <span className="original-price">${product.discount.toFixed(2)}</span>
          }
        </div>
        <div className="rating">{renderStars(product.rating)}</div>
        {successMessage.length > 0 && ( <div className="success-message">{successMessage}</div> )}

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