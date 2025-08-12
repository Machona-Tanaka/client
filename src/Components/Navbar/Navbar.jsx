import React, { useEffect, useState } from 'react';
import { FaBars, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import '../../assets/css/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();


  // Show signup/signin on home page
  const showAuthButtons =
    location.pathname === '/' || location.pathname === '/home';


  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show navbar logic
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setShowNavbar(false); // Scrolling down, hide navbar
          } else {
            setShowNavbar(true); // Scrolling up, show navbar
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  return (
    <nav className={`navbar ${showNavbar ? '' : ' hidden'}`}>
      <div className="navbar-container">
        {/* Hamburger menu for mobile */}
        <input 
          type="checkbox" 
          id="navbar-toggle"
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen(!isMenuOpen)}
          className="navbar-toggle-input"
        />
        <label htmlFor="navbar-toggle" className="hamburger-menu">
          <FaBars />
        </label>
        
        {/* Logo or brand name */}
        <div className="navbar-brand">
          <a href="/">PodMyth</a>
        </div>
        
        {/* Navigation links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {location.pathname !== '/' && location.pathname !== '/home' && (
            <li>
              <a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
            </li>
          )}
          <li><a href="/podcast" onClick={() => setIsMenuOpen(false)}>PodCast</a></li>
          <li><a href="/products" onClick={() => setIsMenuOpen(false)}>PodMerch</a></li>
          <li><a href="/podarticles" onClick={() => setIsMenuOpen(false)}>PodArticles</a></li>
          <li><a href="/podguide" onClick={() => setIsMenuOpen(false)}>PodGuides</a></li>
          <li><a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>
        <div></div>

        {/* Signup and Signin buttons on home page */}
        {showAuthButtons && (
          <div className="auth-buttons">
            <a href="/signup" className="btn signup-btn">Sign Up</a>
            <a href="/signin" className="btn signin-btn">Sign In</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;