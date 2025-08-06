import React from 'react';
import { FaExclamationTriangle, FaTimes, FaTrash } from 'react-icons/fa';
import './styles/Delete.css';

const DeleteConfirmation = ({ 
  itemName,
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="delete-dialog-overlay">
      <div className="delete-dialog-container">
        <div className="delete-dialog-header">
          <FaExclamationTriangle className="warning-icon" />
          <h3>Confirm Deletion</h3>
        </div>
        
        <div className="delete-dialog-body">
          <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        
        <div className="delete-dialog-actions">
          <button 
            onClick={onCancel}
            className="cancel-button"
          >
            <FaTimes /> Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="delete-confirm-button"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;