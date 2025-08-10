import React, { useState, useRef, useEffect } from 'react';
import './css/ImageUploadPopup.css';
import api from '../../../services/api';

const ImageUploadPopup = ({ onClose, product }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (uploadComplete) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [uploadComplete, onClose]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + selectedImages.length > 10) {
      alert('You can upload a maximum of 10 images');
      return;
    }

    const newImages = [];
    const newPreviewUrls = [];

    files.forEach(file => {
      if (!file.type.match('image.*')) {
        return;
      }

      newImages.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        newPreviewUrls.push(reader.result);
        if (newPreviewUrls.length === files.length) {
          setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });

    setSelectedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedImages.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    
    try {
      const formData = new FormData();
      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      const response = await api.uploadProductImages(product.id, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        }
      });
      
      if (response.data) {
        setUploadComplete(true);
        setUploadProgress(100);
      }
    } catch (error) {
      setUploadProgress(0);
      console.error('Error uploading images:', error.message);
      alert(`Upload failed: ${error.message || 'Please try again'}`);
      setIsUploading(false);
      
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <button 
            type="button"
            className="close-btn" 
            onClick={onClose}
            disabled={isUploading && !uploadComplete}
          >
            &times;
          </button>
          
          <h2>Upload Images</h2>
          
          {uploadComplete ? (
            <div className="upload-success">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <p>Upload Complete!</p>
              <p className="small-text">Closing in 3 seconds...</p>
            </div>
          ) : (
            <>
              <div 
                className="upload-area" 
                onClick={triggerFileInput}
                role="button"
                tabIndex={0}
                style={isUploading ? { pointerEvents: 'none', opacity: 0.7 } : {}}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                  disabled={isUploading}
                />
                <p>Click to browse or drag & drop images</p>
                <p className="small-text">Supports JPG, PNG (Max 10 images)</p>
              </div>
              
              {isUploading && (
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <span className="progress-text">{uploadProgress}%</span>
                </div>
              )}
              
              {previewUrls.length > 0 && (
                <div className="preview-container">
                  <h3>Preview ({previewUrls.length}/10)</h3>
                  <div className="image-grid">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="image-preview">
                        <img src={url} alt={`Preview ${index}`} />
                        <button 
                          type="button"
                          className="remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          disabled={isUploading}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="action-buttons">
            <button 
              type="button"
              className="cancel-btn" 
              onClick={onClose}
              disabled={isUploading && !uploadComplete}
            >
              {uploadComplete ? 'Close Now' : 'Cancel'}
            </button>
            {!uploadComplete && (
              <button 
                type="submit"
                className="save-btn" 
                disabled={selectedImages.length === 0 || isUploading}
              >
                {isUploading ? (
                  <>
                    <span className="spinner"></span>
                    Uploading...
                  </>
                ) : (
                  `Upload ${selectedImages.length} Image(s)`
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadPopup;