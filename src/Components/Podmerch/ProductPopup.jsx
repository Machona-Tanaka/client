/* Styles for ProductPopup.jsx */
import React from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaShoppingCart, FaHeart, FaStar, FaRegStar } from 'react-icons/fa';

const ProductPopup = ({ product, showPopup, closePopup, ImageUrlpath, currentImageIndex, setCurrentImageIndex, addToCart, successMessage }) => {
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

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  if (!showPopup || !product) return null;

  return (
    <div className="product-popup-overlay">
      
      <div className="product-popup">
        <button className="close-popup" onClick={closePopup}>
          <FaTimes />
        </button>
        <div className="popup-content">
          <div className="popup-image-container">
            <div className="main-image">
              <img 
                src={ImageUrlpath + product.images[currentImageIndex]} 
                alt={`${product.name} - ${currentImageIndex + 1}`} 
              />
              {product.images.length > 1 && (
                <>
                  <button className="nav-button prev" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <button className="nav-button next" onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="thumbnail-gallery">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={ImageUrlpath + image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="popup-details">
            <h2>{product.name}</h2>
            <div className="popup-category">{product.category}</div>
            <div className="popup-rating">
              {renderStars(product.rating)}
              <span>({product.rating})</span>
            </div>
            <div className="popup-price">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.discount && (
                <span className="original-price">${product.discount.toFixed(2)}</span>
              )}
            </div>
            <p className="popup-description">{product.description}</p>
            <div className="popup-features">
              {successMessage && (
                  <div className="success-message" style={{ color: 'green', marginTop: '10px' }}>
                    {successMessage}
                  </div>
                )}
              {/* <h4>Features:</h4>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul> */}
            </div>
            <div className="popup-actions">
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                <FaShoppingCart className="cart-icon" />
                <span>Add to Cart</span>
              </button>
              <button className="wishlist-btn">
                <FaHeart className="wishlist-icon" />
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;