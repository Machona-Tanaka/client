import React from 'react';
import { FaTimes, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import './css/ShoppingCart.css';

const ShoppingCartPopup = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  // Calculate total items
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <FaShoppingCart className="cart-icon" />
            <h3>Your Cart ({totalItems})</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <img src={item.images[0]} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                          <FiPlus />
                        </button>
                      </div>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="checkout-btn" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPopup;