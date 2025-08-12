import React, { useState, useEffect, useCallback } from 'react';
import ProductPopup from './ProductPopup';
import SearchSection from './SearchSection';
import ProductsGrid from './ProductsGrid';
import Pagination from './Pagination';
import OtherUpdates from './OtherUpdates';
import ErrorComponent from './searchError';
import ShoppingCartPopup from './ShoppingCartPopup';
import { FaShoppingCart } from 'react-icons/fa';
import api from '../../services/api';
import '../../assets/css/ProductDiscovery.css';
import './css/Products.css';

const Products = () => {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Product data state
  const [topProducts, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // UI state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Memoized fetch function
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.findFrontendProducts(
        searchQuery,
        currentPage,
        productsPerPage,
        activeFilter
      );
      setProducts(response.data.data.products);
    } catch (err) {
      setError(err);
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentPage, productsPerPage, activeFilter]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  // Shopping cart functions
  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      return existingItem
        ? prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    setIsCartOpen(false);
  };

  // Other handlers
  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
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

  // Pagination calculations
  const totalPages = Math.ceil(topProducts.length / productsPerPage);
  const currentProducts = topProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Mock data for other updates
  const otherUpdates = [
    {
      id: 6,
      title: "New Collection: Summer Essentials",
      type: "collection",
      date: "Jun 10, 2023"
    },
    // ... other updates
  ];

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
        handleSearch={(e) => e.preventDefault()}
        clearSearch={clearSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <button onClick={() => setIsCartOpen(true)} className="cart-button">
        <FaShoppingCart /> Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
      </button>

      <ShoppingCartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <div className="main-content">
        {isLoading ? (
          <div className="loading-indicator">Loading products...</div>
        ) : error ? (
          <ErrorComponent 
            searchQuery={searchQuery} 
            onClearSearch={clearSearch}
          />
        ) : (
          <>
            <div className="top-products">
              <h2 className="section-title">Our Products</h2>
              <ProductsGrid 
                products={currentProducts} 
                viewProduct={viewProduct} 
                isFeatured={true}
              />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={setCurrentPage}
                />
              )}
            </div>
            <OtherUpdates updates={otherUpdates} />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;