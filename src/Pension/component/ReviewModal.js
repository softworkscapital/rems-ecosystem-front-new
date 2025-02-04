// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h2>Survey Results</h2>
        <p><strong>Total Sum:</strong> {data.total_sum}</p>
        <p><strong>Number of Participants:</strong> {data.Number_of_participants}</p>
        <p><strong>Average Percentage:</strong> {data.average_percentage}%</p>
        <p><strong>Complexity Level:</strong> {data.Answer_range}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Modal styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default Modal;