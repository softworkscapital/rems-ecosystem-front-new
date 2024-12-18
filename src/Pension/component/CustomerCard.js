// component/CustomerCard.js
import React from 'react';
import { FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerCard = ({ customer }) => {
    const defaultImage = <FaUserCircle size={100} color="#007bff" />; // Default user icon

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body d-flex align-items-center">
                <div className="me-3">
                    {customer.image ? (
                        <img
                            src={customer.image}
                            alt="Customer"
                            className="img-fluid rounded-circle"
                            style={{ width: '100px', height: '100px' }}
                        />
                    ) : (
                        defaultImage
                    )}
                </div>
                <div className="text-start">
                    <h5 className="card-title">{customer.name}</h5>
                    <p className="card-text">
                        <FaEnvelope className="me-2" />
                        <strong>Email:</strong> {customer.email}
                    </p>
                    <p className="card-text">
                        <FaPhone className="me-2" />
                        <strong>Phone:</strong> {customer.phone}
                    </p>
                    <button className="btn btn-primary">View Profile</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerCard;