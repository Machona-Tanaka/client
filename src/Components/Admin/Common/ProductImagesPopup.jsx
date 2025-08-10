import React, { useState } from 'react';
import './css/ProductImagePopup.css';


const ProductImagePopup = ({ images, onDelete, onClose }) => {
  const url = 'http://localhost:3000/';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      await onDelete(images[currentIndex].id);
      // After deletion, adjust the current index if needed
      if (currentIndex >= images.length - 1) {
        setCurrentIndex(images.length - 2);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="popup-overlay">
        <div className="popup-content empty">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        
        <div className="image-container">
          <img 
            src={`${url}${images[currentIndex].url}`} 
            alt={`Product ${currentIndex + 1}`} 
            className="product-image"
          />
          
          {images.length > 1 && (
            <>
              <button className="nav-btn prev-btn" onClick={handlePrev}>
                &#10094;
              </button>
              <button className="nav-btn next-btn" onClick={handleNext}>
                &#10095;
              </button>
            </>
          )}
        </div>
        
        <div className="image-info">
          <span className="image-counter">
            {currentIndex + 1} / {images.length}
          </span>
          
          <button 
            className="image-delete-btn" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Image'}
          </button>
        </div>
        
        <div className="thumbnail-container">
          {images.map((img, index) => (
            <div 
              key={img.id} 
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={`${url}${img.url}`} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImagePopup;