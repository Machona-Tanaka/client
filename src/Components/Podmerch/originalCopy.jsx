import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaHeart, FaStar, FaRegStar, FaFilter, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../assets/css/ProductDiscovery.css';
import './css/Products.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState('latest');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data for top 5 products with multiple images
  const topProducts = [
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones",
      price: 299.99,
      discount: 349.99,
      rating: 4.5,
      images: [
        "https://via.placeholder.com/600x600?text=Headphones+Front",
        "https://via.placeholder.com/600x600?text=Headphones+Side",
        "https://via.placeholder.com/600x600?text=Headphones+Back",
        "https://via.placeholder.com/600x600?text=Headphones+Case"
      ],
      category: "Audio",
      isNew: true,
      description: "Experience premium sound quality with our latest wireless noise-canceling headphones. Perfect for travel and daily use.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Bluetooth 5.0",
        "Built-in microphone",
        "Foldable design"
      ]
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      discount: 249.99,
      rating: 4.2,
      images: [
        "https://via.placeholder.com/600x600?text=Watch+Front",
        "https://via.placeholder.com/600x600?text=Watch+Side",
        "https://via.placeholder.com/600x600?text=Watch+Back"
      ],
      category: "Wearables",
      isNew: true,
      description: "Track your fitness goals with this advanced smartwatch that monitors heart rate, sleep, and more.",
      features: [
        "Heart rate monitoring",
        "Sleep tracking",
        "Water resistant",
        "7-day battery life",
        "Smart notifications"
      ]
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      discount: 39.99,
      rating: 4.0,
      images: [
        "https://via.placeholder.com/600x600?text=T-Shirt+Front",
        "https://via.placeholder.com/600x600?text=T-Shirt+Back"
      ],
      category: "Apparel",
      isNew: false,
      description: "Comfortable and eco-friendly organic cotton t-shirt available in multiple colors.",
      features: [
        "100% organic cotton",
        "Breathable fabric",
        "Multiple colors available",
        "Machine washable",
        "Slim and regular fit"
      ]
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      discount: 34.99,
      rating: 4.7,
      images: [
        "https://via.placeholder.com/600x600?text=Bottle+Closed",
        "https://via.placeholder.com/600x600?text=Bottle+Open",
        "https://via.placeholder.com/600x600?text=Bottle+Side"
      ],
      category: "Accessories",
      isNew: false,
      description: "Keep your drinks hot or cold for hours with this premium stainless steel water bottle.",
      features: [
        "Double-wall insulation",
        "Leak-proof lid",
        "BPA-free materials",
        "500ml capacity",
        "Multiple color options"
      ]
    },
    {
      id: 5,
      name: "Bluetooth Portable Speaker",
      price: 89.99,
      discount: 109.99,
      rating: 4.3,
      images: [
        "https://via.placeholder.com/600x600?text=Speaker+Front",
        "https://via.placeholder.com/600x600?text=Speaker+Top",
        "https://via.placeholder.com/600x600?text=Speaker+Back",
        "https://via.placeholder.com/600x600?text=Speaker+Charging"
      ],
      category: "Audio",
      isNew: true,
      description: "Take your music anywhere with this powerful and portable Bluetooth speaker.",
      features: [
        "10-hour playtime",
        "IPX7 waterproof",
        "Built-in microphone",
        "Wireless pairing",
        "Compact design"
      ]
    }
  ];

  // Mock data for other updates
  const otherUpdates = [
    {
      id: 6,
      title: "New Collection: Summer Essentials",
      type: "collection",
      date: "Jun 10, 2023"
    },
    {
      id: 7,
      title: "Limited Time Offer: 20% Off All Audio",
      type: "sale",
      date: "Jun 9, 2023"
    },
    {
      id: 8,
      title: "How to Choose the Right Headphones - Guide",
      type: "guide",
      date: "Jun 8, 2023"
    }
  ];

  // Mock search function
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setSearchResults([
          {
            id: 101,
            name: `Premium ${searchQuery} Pro`,
            price: 149.99,
            discount: 179.99,
            rating: 4.4,
            images: [
              "https://via.placeholder.com/600x600?text=Search+Product+1",
              "https://via.placeholder.com/600x600?text=Search+Product+2"
            ],
            category: "Search Results",
            isNew: true,
            description: `High-quality ${searchQuery} with professional features.`,
            features: [
              "Premium materials",
              "Advanced functionality",
              "Long-lasting performance",
              "User-friendly design"
            ]
          },
          {
            id: 102,
            name: `Wireless ${searchQuery} Kit`,
            price: 79.99,
            discount: 99.99,
            rating: 3.9,
            images: [
              "https://via.placeholder.com/600x600?text=Wireless+Kit+1",
              "https://via.placeholder.com/600x600?text=Wireless+Kit+2"
            ],
            category: "Search Results",
            isNew: false,
            description: `Complete wireless ${searchQuery} solution for everyday use.`,
            features: [
              "Wireless connectivity",
              "Easy setup",
              "Portable design",
              "Battery included"
            ]
          },
          {
            id: 103,
            name: `${searchQuery} Travel Case`,
            price: 19.99,
            discount: 24.99,
            rating: 4.1,
            images: [
              "https://via.placeholder.com/600x600?text=Case+Closed",
              "https://via.placeholder.com/600x600?text=Case+Open"
            ],
            category: "Accessories",
            isNew: true,
            description: `Protect your ${searchQuery} with this durable travel case.`,
            features: [
              "Shock-absorbent material",
              "Compact design",
              "Water-resistant",
              "Multiple compartments"
            ]
          }
        ]);
      }, 500);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  // View product details
  const viewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setShowPopup(true);
  };

  // Close product popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  // Navigate through product images
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  // Add to cart function
  const addToCart = (product) => {
    // In a real app, this would add the product to the cart
    alert(`${product.name} has been added to your cart!`);
    closePopup();
  };

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

  return (
    <div className="product-discovery">
      {/* Product Popup */}
      {showPopup && selectedProduct && (
        <div className="product-popup-overlay">
          <div className="product-popup">
            <button className="close-popup" onClick={closePopup}>
              <FaTimes />
            </button>
            <div className="popup-content">
              <div className="popup-image-container">
                <div className="main-image">
                  <img 
                    src={selectedProduct.images[currentImageIndex]} 
                    alt={`${selectedProduct.name} - ${currentImageIndex + 1}`} 
                  />
                  {selectedProduct.images.length > 1 && (
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
                {selectedProduct.images.length > 1 && (
                  <div className="thumbnail-gallery">
                    {selectedProduct.images.map((image, index) => (
                      <div 
                        key={index} 
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="popup-details">
                <h2>{selectedProduct.name}</h2>
                <div className="popup-category">{selectedProduct.category}</div>
                <div className="popup-rating">
                  {renderStars(selectedProduct.rating)}
                  <span>({selectedProduct.rating})</span>
                </div>
                <div className="popup-price">
                  <span className="current-price">${selectedProduct.price.toFixed(2)}</span>
                  {selectedProduct.discount && (
                    <span className="original-price">${selectedProduct.discount.toFixed(2)}</span>
                  )}
                </div>
                <p className="popup-description">{selectedProduct.description}</p>
                <div className="popup-features">
                  <h4>Features:</h4>
                  <ul>
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="popup-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(selectedProduct)}
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
      )}


      {/* Hero Section */}
      <div className="hero-section">
        <h1>Discover Amazing Products</h1>
        <p>Shop the latest and greatest from our collection</p>
      </div>

      {/* Search Section */}
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

      {/* Main Content */}
      <div className="main-content">
        {/* Products Display */}
        {isSearching ? (
          <div className="search-results">
            <h2 className="section-title">
              Search Results for: <span className="query">"{searchQuery}"</span>
            </h2>
            <div className="products-grid minimal">
              {searchResults.map((product) => (
                <div key={product.id} className="product-card minimal">
                  <div className="product-badge">
                    {product.isNew && <span className="new-badge">New</span>}
                    <span className="discount-badge">
                      {Math.round(((product.discount - product.price) / product.discount) * 100)}% Off
                    </span>
                  </div>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
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
              ))}
            </div>
          </div>
        ) : (
          <div className="top-products">
            <h2 className="section-title">Top 5 Latest Products</h2>
            <div className="products-grid featured">
              {topProducts.map((product) => (
                <div key={product.id} className="product-card featured">
                  <div className="product-badge">
                    {product.isNew && <span className="new-badge">New</span>}
                    <span className="discount-badge">
                      {Math.round(((product.discount - product.price) / product.discount) * 100)}% Off
                    </span>
                  </div>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
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
              ))}
            </div>
          </div>
        )}

        {/* Other Updates Section */}
        <div className="other-updates">
          <h2 className="section-title">Other Updates</h2>
          <div className="updates-grid">
            {otherUpdates.map((update) => (
              <div key={update.id} className={`update-card ${update.type}`}>
                <div className="update-content">
                  <h3>{update.title}</h3>
                  <span className="update-date">{update.date}</span>
                  <button className="update-button">
                    {update.type === 'collection' && 'View Collection'}
                    {update.type === 'sale' && 'Shop Sale'}
                    {update.type === 'guide' && 'Read Guide'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;