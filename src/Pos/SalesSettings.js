// src/SalesSettings.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import SideBar from './SideBar';
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

const SalesSettings = () => {
    const navigate = useNavigate();
    const [taxRate, setTaxRate] = useState(0);
    const [currency, setCurrency] = useState('USD');
    const [discountRate, setDiscountRate] = useState(0);
    const [interestRate, setInterestRate] = useState(0);

    const handleTaxChange = (e) => setTaxRate(e.target.value);
    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handleDiscountChange = (e) => setDiscountRate(e.target.value);
    const handleInterestChange = (e) => setInterestRate(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Settings saved: 
        Tax Rate: ${taxRate}%, 
        Currency: ${currency}, 
        Discount Rate: ${discountRate}%, 
        Interest Rate: ${interestRate}%`);
    };

    const handleCompanySetupClick = () => {
        navigate('/CompanySetup');
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#fff' }}>
            <TopNav />
            <div className="d-flex flex-grow-1">
                <SideBar />
                <div className="flex-grow-1 p-4 ms-5 mt-5" style={{ backgroundColor: '#f1f1f1', maxHeight: '100vh', overflowY: 'auto' }}>
                    <h2 className="mb-4" style={{ textAlign: "center" }}>Sales Settings</h2>
                    <button 
    className="btn btn-secondary" 
    onClick={handleCompanySetupClick}
>
    Company Setup
</button>
                    <hr></hr>
                    <form 
                        onSubmit={handleSubmit} 
                        className="mt-3 p-4" 
                        style={{ 
                            backgroundColor: '#fff', 
                            borderRadius: '8px', 
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
                            maxWidth: '600px', 
                            marginLeft: 'auto', 
                            marginRight: 'auto' 
                        }}
                    >
                        <div className="mb-3 row">
                            <label className="col-sm-4 col-form-label">Tax Rate (%):</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{ backgroundColor: '#fff' }}
                                    value={taxRate}
                                    onChange={handleTaxChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-4 col-form-label">Currency:</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-select"
                                    style={{ backgroundColor: '#fff' }}
                                    value={currency}
                                    onChange={handleCurrencyChange}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-4 col-form-label">Discount Rate (%):</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{ backgroundColor: '#fff' }}
                                    value={discountRate}
                                    onChange={handleDiscountChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-4 col-form-label">Interest Rate (%):</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{ backgroundColor: '#fff' }}
                                    value={interestRate}
                                    onChange={handleInterestChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Save Settings</button>
                    </form>
                </div>
            </div>
            <Footer /> 
        </div>
    );
};

export default SalesSettings;