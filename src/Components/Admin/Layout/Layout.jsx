import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; // If using React Router
import { Paper } from '@mui/material';

import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';


function useIsMobileView(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}


const UserNavButtons = React.lazy(() => import('./UserNavButtons'));
const ProductsManagerNavigation = React.lazy(() => import('./ProductsNavButtons'));
// import { Box, CssBaseline } from '@mui/material';

const Layout = ({ user, logout }) => {
  
  const [isHidden, setIsHidden] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);
  const isMobile = useIsMobileView();
  const toggleSidebar = () => setIsHidden(!isHidden);
  const toggleMobileSidebar = () => setMobileVisible(!mobileVisible);

  const [containsUser, setContainsUser] = useState(false);
  const [containsProducts, setContainsProducts] = useState(false);


  const location = useLocation(); // React Router hook

  // Hide parent admin layout when this layout is active
  useEffect(() => {
    const parentAdminLayout = document.querySelector('.navbar');
    const parentSidebar = document.querySelector('.sidebar')
    if (parentAdminLayout) {
      if (location.pathname.includes('content')) {
        parentAdminLayout.style.display = 'none';
        toggleSidebar();
        // Remove hidden class from parent elements
        parentSidebar?.classList.add('hidden');
        // parentNavbar?.classList.remove('hidden');
      } else {
        parentAdminLayout.style.display = 'block';

        parentSidebar.style.display = 'block';
      }
    }

    // Cleanup function to restore parent layout when unmounted
    return () => {
      if (parentAdminLayout) {
        parentAdminLayout.style.display = 'block';
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    // For React Router (clean path without query params)
    const hasUser = location.pathname.toLowerCase().includes('user');
    const hasProducts = location.pathname.toLowerCase().includes('products');
    
    // For full URL including query params:
    // const hasUser = window.location.href.toLowerCase().includes('user');
    
    setContainsUser(hasUser);
    setContainsProducts(hasProducts);
  }, [location]);

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></link>
      <Navbar />
      {/* Mobile menu button (only visible on small screens) */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMobileSidebar}
      >
        <FaBars />
      </button>
          <button 
            className={`
              fixed top-4 z-[9999] 
              p-2 bg-gray-800 rounded-full border-2 border-white
              hover:bg-gray-700 transition-all duration-200
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
              transform hover:scale-12
              ${isMobile ? 'hidden' : 'block'}
            `}
            style={{ 
              left: isHidden 
                ? '0.5rem'   // left-2 equivalent
                : '16rem',    // left-60 equivalent

            
            }}
            onClick={toggleSidebar}
          >
            {isHidden ? (
              <FaChevronRight className="text-white text-sm" />
            ) : (
              <FaChevronLeft className="text-white text-sm" />
            )}
          </button>
      {/* Sidebar */}
      <div className={`sidebar ${isHidden ? 'hidden' : ''} ${mobileVisible ? 'visible-mobile' : ''}`}>
        
        <div className="sidebar-header">
          <h3><span>Admin Dashboard</span></h3>
        </div>
        <nav className="sidebar-nav">
           <Sidebar />
        </nav>
        
        <div className="sidebar-footer">
          {user && (
            <button onClick={logout} className="logout-btn">
              <FaSignOutAlt /><span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className={`main-content  ${isHidden ? 'sidebar-hidden' : ''}`}>

          {containsUser ? (
           <UserNavButtons />
          ) : (
            ''
          )}


          {containsProducts ? (
            <ProductsManagerNavigation />
          ) : (
            ''
          )}

        <Paper  elevation={0} sx={{  width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', p: 2}}></Paper>
          <Outlet />
        <Paper />

        
      </div>
      <div className={`footer-content  ${isHidden ? 'sidebar-hidden' : ''}`}>
        <Footer />
      </div>

      
    </>
    );
};

export default Layout;