import React from 'react';

const BasicPaymentRate = ({ rate }) => (
  <div style={cardStyle}>
    <h5>Basic Payment Rate</h5>
    <p>${rate}</p>
  </div>
);

const cardStyle = {
  padding: '10px',
  backgroundColor: '#ffffff',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  marginBottom: '10px',
};

export default BasicPaymentRate;