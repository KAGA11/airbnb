import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="error-popup-backdrop">
      <div className="error-popup">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
