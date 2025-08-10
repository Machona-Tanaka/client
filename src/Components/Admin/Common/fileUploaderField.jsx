import React, { useState } from 'react';
import './css/fileUpload.css'

const DynamicFileUpload = () => {
  const [uploadFields, setUploadFields] = useState([
    { id: 1, files: [], previews: [] }
  ]);

  // Add a new upload field
  const addUploadField = () => {
    const newId = uploadFields.length > 0 ? Math.max(...uploadFields.map(field => field.id)) + 1 : 1;
    setUploadFields([...uploadFields, { id: newId, files: [], previews: [] }]);
  };

  // Remove an upload field
  const removeUploadField = (id) => {
    if (uploadFields.length <= 1) return; // Don't remove the last one
    setUploadFields(uploadFields.filter(field => field.id !== id));
  };

  // Handle file change for a specific field
  const handleFileChange = (id, e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate files (images only, max 5MB)
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        alert(`File ${file.name} is not a supported image type (JPEG, PNG, GIF)`);
        return false;
      }
      
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large (max 5MB)`);
        return false;
      }
      
      return true;
    });

    // Generate previews
    const newPreviews = validFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    // Update the specific field
    setUploadFields(uploadFields.map(field => {
      if (field.id === id) {
        return {
          ...field,
          files: [...field.files, ...validFiles],
          previews: [...field.previews, ...newPreviews]
        };
      }
      return field;
    }));
  };

  // Remove a file from a specific field
  const removeFile = (fieldId, fileIndex) => {
    setUploadFields(uploadFields.map(field => {
      if (field.id === fieldId) {
        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(field.previews[fileIndex].url);
        
        const newFiles = [...field.files];
        const newPreviews = [...field.previews];
        newFiles.splice(fileIndex, 1);
        newPreviews.splice(fileIndex, 1);
        
        return {
          ...field,
          files: newFiles,
          previews: newPreviews
        };
      }
      return field;
    }));
  };

  // Clear all files in a specific field
  const clearField = (fieldId) => {
    setUploadFields(uploadFields.map(field => {
      if (field.id === fieldId) {
        // Revoke all object URLs
        field.previews.forEach(preview => URL.revokeObjectURL(preview.url));
        return {
          ...field,
          files: [],
          previews: []
        };
      }
      return field;
    }));
  };

  // Submit all files
  const handleSubmit = (e) => {
    e.preventDefault();
    const allFiles = uploadFields.flatMap(field => field.files);
    
    if (allFiles.length === 0) {
      alert('Please select at least one file');
      return;
    }

    console.log('Files to upload:', allFiles);
    // Here you would typically handle the file upload logic, e.g., sending to a server
    
  };

  return (
    <div className="dynamic-upload-container">
      <h2>Multiple File Upload Fields</h2>
      
      {uploadFields.map((field) => (
        <div key={field.id} className="upload-field">
          <div className="field-header">
            <h3>Upload Thumbnail</h3>
            {uploadFields.length > 1 && (
              <button 
                onClick={() => removeUploadField(field.id)}
                className="remove-field-btn"
              >
                Remove Field
              </button>
            )}
          </div>
          
          <div className="file-input-container">
            <input
              type="file"
              id={`file-upload-${field.id}`}
              onChange={(e) => handleFileChange(field.id, e)}
              multiple
              accept="image/jpeg, image/png, image/gif"
            />
            <label htmlFor={`file-upload-${field.id}`} className="file-upload-label">
              Choose Files
            </label>
            {field.files.length > 0 && (
              <button 
                onClick={() => clearField(field.id)}
                className="clear-field-btn"
              >
                Clear All
              </button>
            )}
          </div>
          
          {field.previews.length > 0 && (
            <div className="previews-container">
              <h4>Selected Files ({field.files.length})</h4>
              <div className="previews-grid">
                {field.previews.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img 
                      src={preview.url} 
                      alt={preview.name} 
                      className="preview-image"
                    />
                    <div className="preview-info">
                      <span>{preview.name}</span>
                      <button 
                        onClick={() => removeFile(field.id, index)}
                        className="remove-file-btn"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="action-buttons">
        <button onClick={addUploadField} className="add-field-btn">
          Add Another Upload Field
        </button>
        <button onClick={handleSubmit} className="submit-btn">
          Upload All Files
        </button>
      </div>
    </div>
  );
};

export default DynamicFileUpload;