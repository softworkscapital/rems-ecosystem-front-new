import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";

const customers = [
  { id: 1, name: "Customer A" },
  { id: 2, name: "Customer B" },
  { id: 3, name: "Customer C" },
  // Add more customers as needed
];

const MakePayments = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [notes, setNotes] = useState("");

  const handleSelectCustomer = (e) => {
    const customer = customers.find((c) => c.name === e.target.value);
    setSelectedCustomer(customer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment submitted:", {
      customer: selectedCustomer,
      amount,
      currency,
      paymentMode,
    });
    // Reset form after submission
    setAmount("");
    setSelectedCustomer(null);
    setCurrency("USD");
    setPaymentMode("Credit Card");
    setNotes("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <ProfileCard />
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4" style={{ marginTop: 80 }}>
              Contributions Payments
            </h2>
            <h3 className="card-title text-center">Make a Payment</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="customer" className="form-label">
                  Select Customer
                </label>
                <select
                  id="customer"
                  className="form-control form-control-user"
                  value={selectedCustomer?.name || ""}
                  onChange={handleSelectCustomer}
                  style={{ borderRadius: "5px", padding: "15px", fontSize: "16px" }}
                  required
                >
                  <option value="">Choose...</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.name}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="form-control form-control-user"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  style={{ borderRadius: "5px", padding: "15px", fontSize: "16px" }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="currency" className="form-label">
                  Currency
                </label>
                <select
                  id="currency"
                  className="form-control form-control-user"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ borderRadius: "5px", padding: "15px", fontSize: "16px" }}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="purpose" className="form-label">
                  Purpose
                </label>
                <select
                  id="purpose"
                  className="form-control form-control-user"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{ borderRadius: "5px", padding: "15px", fontSize: "16px" }}
                >
                  <option value="Contributions and Interest">Contributions and Interest</option>
                  <option value="Penalty">Penalty</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
                <input
                  id="notes"
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ borderRadius: "5px", padding: "15px", fontSize: "16px" }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="paymentMode" className="form-label">
                  Payment Mode
                </label>
                <select
                  id="paymentMode"
                  className="form-control form-control-user"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  style={{ borderRadius: "5px", padding: "15px", fontSize: "16px" }}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "16px" }}>
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayments;