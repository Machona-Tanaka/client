import React, { useState, useEffect } from 'react';
import ProductPopup from './ProductPopup';
import SearchSection from './SearchSection';
import ProductsGrid from './ProductsGrid';
import Pagination from './Pagination';
import OtherUpdates from './OtherUpdates';
import ErrorComponent from './searchError';
import ShoppingCartPopup from './ShoppingCartPopup';
import { FaTimes, FaShoppingCart, FaTrash } from 'react-icons/fa';

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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Shopping Cart Code
   const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add to cart function
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Checkout
  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    // Your checkout logic here
  };


  // Mock data (would normally come from API)
  // const topProducts = []; // Your products data
  // const otherUpdates = []; // Your updates data
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

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = topProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(topProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Mock search implementation
      setTimeout(() => {
        const results = topProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
      }, 500);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

 

  return (
    <div className="product-discovery">
      <title>Product Discovery</title>

      <ProductPopup
        product={selectedProduct}
        showPopup={showPopup}
        closePopup={closePopup}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        addToCart={addToCart}
      />

      <div className="hero-section">
        <h1>Discover Amazing Products</h1>
        <p>Shop the latest and greatest from our collection</p>
      </div>

      <SearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <button onClick={() => setIsCartOpen(true)}>
        <FaShoppingCart /> Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
      </button>
      {/* Shopping Cart Popup */}
      <ShoppingCartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <div className="main-content">
       {isSearching ? (
            <div className="search-results">
              <h2 className="section-title">
                Search Results for: <span className="query">"{searchQuery}"</span>
              </h2>
              {searchResults.length > 0 ? (
                <ProductsGrid 
                  products={searchResults} 
                  viewProduct={viewProduct} 
                  isFeatured={false}
                />
              ) : (
                <ErrorComponent 
                  searchQuery={searchQuery} 
                  onClearSearch={clearSearch}
                />
              )}
            </div>
          ) : (
          <>
            <div className="top-products">
              <h2 className="section-title">Our Products</h2>
              <ProductsGrid 
                products={currentProducts} 
                viewProduct={viewProduct} 
                isFeatured={true}
              />{ totalPages > 1 &&
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />}
            </div>
            <OtherUpdates updates={otherUpdates} />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;