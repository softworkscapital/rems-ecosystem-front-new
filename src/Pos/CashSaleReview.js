import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL, UPLOADS_API_URL } from './config';
import Footer from "../Footer";

const CashSaleReview = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get location to access state

    // Retrieve customer details, items, notes, and other data from state
    const { customer, items, notes, interestRate, paymentTerms, paymentType, currency } = location.state || {};

    const calculateSubtotal = () => {
        return items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.05; // Example tax rate of 5%
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSave = async () => {
        const paymentData = {
            customerId: customer.id,
            items: items.map(item => ({
                description: item.description,
                amount: item.amount,
                quantity: item.quantity,
                total: item.amount * item.quantity,
            })),
            notes,
            interestRate,
            paymentTerms,
            paymentType,
            currency,
            subtotal: calculateSubtotal(),
            tax: calculateTax(),
            total: calculateTotal(),
        };

        try {
            const response = await fetch(`${API_URL}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert("Payment saved successfully!");
                navigate("/some-success-page"); // Redirect to a success page or dashboard
            } else {
                alert("Failed to save payment. Please try again.");
            }
        } catch (error) {
            console.error("Error saving payment:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                marginTop: 100,
            }}
        >
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    padding: "20px",
                }}
            >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src="/assets/images/logo1.png"
                        alt="Logo"
                        style={{ width: "50%", maxWidth: "300px" }}
                    />
                </div>
                <div className="modal-header">
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <hr style={{ backgroundColor: "blue", height: "2px" }} />
                        <div className="d-flex justify-content-between align-items-start">
                            <div style={{ display: "flex", flex: 1 }}>
                                <img
                                    src="/assets/images/subheader.png"
                                    alt="Subheader"
                                    style={{ width: "50%", maxWidth: "300px" }}
                                />
                            </div>
                            <div style={{ textAlign: "right", color: "blue", flex: 1 }}>
                                <p style={{ margin: "2px 0", fontSize: "0.9rem" }}>
                                    Date: <span>{new Date().toLocaleDateString()}</span>
                                </p>
                                <p style={{ margin: "2px 0", fontSize: "0.9rem" }}>
                                    Invoice #: <span>001</span>
                                </p>
                                <p style={{ margin: "2px 0", fontSize: "0.9rem" }}>
                                    Customer ID: <span>{customer.id}</span>
                                </p>
                            </div>
                        </div>
                        <hr style={{ backgroundColor: "green", height: "2px" }} />
                    </div>
                </div>

                {/* Body Section */}
                <div className="modal-body" style={{ overflowY: "auto", backgroundColor: "white" }}>
                    <div className="invoice-container" style={{ padding: "20px" }}>
                        <div className="d-flex justify-content-between align-items-start">
                            <div style={{ flex: 1, textAlign: "left" }}>
                                <h3 style={{ fontSize: "1.2rem" }}>Billing To:</h3>
                                <h6 style={{ fontSize: "1rem" }}>Received By: {customer.name}</h6>
                                <p style={{ fontSize: "0.9rem" }}>{customer.location}</p>
                            </div>
                            <div style={{ flex: 1, textAlign: "left" }}>
                                <h3 style={{ fontSize: "1.2rem" }}>Shipping To:</h3>
                                <h6 style={{ fontSize: "1rem" }}>Received By: {customer.name}</h6>
                                <p style={{ fontSize: "0.9rem" }}>{customer.location}</p>
                            </div>
                            <div style={{ textAlign: "center", flex: 1 }}>
                                <h2 className="invoice-text" style={{ color: "red", fontSize: "1.5rem", fontWeight: "bold", textDecoration: "underline" }}>CASH SALE</h2>
                                <hr style={{ backgroundColor: "darkblue", height: "2px" }} />
                            </div>
                        </div>

                        {/* Invoice Items Table */}
                        <table className="table table-striped table-bordered" style={{ backgroundColor: "white", marginTop: "20px", fontSize: "0.9rem" }}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.amount.toFixed(2)}</td>
                                        <td>${(item.amount * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Notes and Summary */}
                        <div className="invoice-notes" style={{ padding: "20px 0", backgroundColor: "white", textAlign: "left" }}>
                            <h3 style={{ fontSize: "1.2rem" }}>Notes:</h3>
                            <p style={{ fontSize: "0.9rem" }}>{notes}</p>
                        </div>

                        <div className="invoice-summary" style={{ textAlign: "right", marginTop: "20px", backgroundColor: "white", fontSize: "0.9rem" }}>
                            <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                            <p>Sales Tax: ${calculateTax().toFixed(2)}</p>
                            <p>Total: ${calculateTotal().toFixed(2)}</p>
                        </div>

                        {/* Payment Info */}
                        <div className="payment-info" style={{ textAlign: "left", marginTop: "20px", display: "flex", justifyContent: "space-between", backgroundColor: "white", fontSize: "0.9rem" }}>
                            <div>
                                <p>Interest Rate: {interestRate}%</p>
                                <p>Payment Terms: {paymentTerms}</p>
                                <p>Payment Type: {paymentType}</p>
                                <p>Currency: {currency}</p>
                            </div>
                        </div>

                        <hr style={{ backgroundColor: "black", height: "2px" }} />

                        {/* Banking Details */}
                        <div style={{ padding: "20px 0", textAlign: "center" }}>
                            <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Bank Details:</h3>
                            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
                                <div style={{ flex: 1, textAlign: "center" }}>
                                    <p style={{ margin: 0, fontSize: "0.9rem" }}>Bank Name: Example Bank</p>
                                    <p style={{ margin: 0, fontSize: "0.9rem" }}>Account No: 123456789</p>
                                </div>
                                <div style={{ flex: 1, textAlign: "center" }}>
                                    <p style={{ margin: 0, fontSize: "0.9rem" }}>SWIFT Code: EXAMPLE123</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ backgroundColor: "black", height: "2px" }} />

                {/* Footer with Actions */}
                <div className="modal-footer" style={{ marginBottom: 45 }}>
                    <button className="btn btn-danger" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn btn-primary mx-2" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default CashSaleReview;