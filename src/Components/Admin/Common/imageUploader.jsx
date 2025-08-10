import React, { useState } from 'react';
// import axios from 'axios';
import './css/MultiImageUploader.css'; // We'll create this CSS file
import { FaUpload, FaPlus } from 'react-icons/fa';

const MultiImageUploader = ({ product }) => {

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const existingFiles = files;
    
    const newFiles = selectedFiles.filter(
      file => !existingFiles.some(f => f.name === file.name && f.size === file.size)
    );
    
    const updatedFiles = [...existingFiles, ...newFiles];
    setFiles(updatedFiles);
    product.image_file = updatedFiles; // Update the product state with new files
    const newPreviews = newFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size
    }));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    // Remove the corresponding preview
    product.image_file = files.filter((_, i) => i !== index); // Update the product state
    setPreviews(prevPreviews => {
      URL.revokeObjectURL(prevPreviews[index].url);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  React.useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  return (
    <div className="multi-image-uploader">
          
      <label className="file-input-label">
        Choose Images <FaPlus />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
      </label>

      {previews.length > 0 && (
        <div className="uploader-content">
          <h3 className="selected-count">Selected Images ({previews.length}):</h3>
          
          <div className="preview-grid">
            {previews.map((preview, index) => (
              <div key={index} className="preview-card">
                <img 
                  src={preview.url} 
                  alt={preview.name} 
                  className="preview-image"
                />
                <p className="preview-name">{preview.name}</p>
                <p className="preview-size">{(preview.size / 1024).toFixed(2)} KB</p>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="remove-button"
                  title="Remove"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default MultiImageUploader;