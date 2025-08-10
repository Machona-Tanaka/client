  
  import './css/Products.css';
  
    // Render star ratings
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



  // View Product Modal
  const ProductViewModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="product-view-modal">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <button className="close-modal" onClick={onClose}>
            <FaTimes />
          </button>
          
          <div className="product-view-container">
            <div className="product-gallery">
              <div className="main-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="thumbnail-container">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="thumbnail">
                    <img src={product.image} alt={`Thumbnail ${num}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="product-details">
              <h2>{product.name}</h2>
              <div className="rating">
                {renderStars(product.rating)}
                <span className="review-count">(42 reviews)</span>
              </div>
              
              <div className="price-container">
                <span className="current-price">${product.price.toFixed(2)}</span>
                {product.discount && (
                  <>
                    <span className="original-price">${product.discount.toFixed(2)}</span>
                    <span className="discount-percent">
                      {Math.round(((product.discount - product.price) / product.discount) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <p className="description">{product.description}</p>
              
              <div className="product-meta">
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{product.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Availability:</span>
                  <span className="meta-value">
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Colors:</span>
                  <div className="color-options">
                    {product.colors.map(color => (
                      <span key={color} className="color-dot" style={{ backgroundColor: color.toLowerCase() }}></span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="product-actions">
                <div className="quantity-selector">
                  <button className="quantity-btn">-</button>
                  <span className="quantity">1</span>
                  <button className="quantity-btn">+</button>
                </div>
                <button className="add-to-cart">
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="wishlist-btn">
                  <FaHeart /> Add to Wishlist
                </button>
              </div>
              
              <div className="product-features">
                <h3>Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductViewModal;