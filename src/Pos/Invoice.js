import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import SideBar from "./SideBar";

const Invoice = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editableModalVisible, setEditableModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({
    items: [],
    // other invoice properties...
  });

  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemAmount, setNewItemAmount] = useState(0);
  const [newItemBalance, setNewItemBalance] = useState(0);

  // Sample data for invoices
  const invoices = [
    {
      id: 1,
      customer: "Mr. Siba Prasad Behera",
      date: "2023-11-01",
      total: 190,
      items: [{ description: "Item A", amount: 100, balance: 90 }],
      notes: "Thank you!",
      interestRate: 5,
      paymentTerms: "30 days",
      paymentType: "Credit",
      currency: "USD",
    },
    {
      id: 2,
      customer: "Jane Doe",
      date: "2023-11-05",
      total: 300,
      items: [{ description: "Item B", amount: 200, balance: 100 }],
      notes: "Please pay on time.",
      interestRate: 7,
      paymentTerms: "60 days",
      paymentType: "Cash",
      currency: "USD",
    },
    {
      id: 3,
      customer: "John Smith",
      date: "2023-11-10",
      total: 250,
      items: [{ description: "Item C", amount: 250, balance: 0 }],
      notes: "No notes.",
      interestRate: 0,
      paymentTerms: "Due upon receipt",
      paymentType: "Check",
      currency: "USD",
    },
  ];

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setModalVisible(true);
  };

  const openEditableModal = (invoice) => {
    setSelectedInvoice(invoice);
    setEditableModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedInvoice({
      items: [],
      // reset other properties if needed...
    });
  };

  const closeEditableModal = () => {
    setEditableModalVisible(false);
    setSelectedInvoice({
      items: [],
      // reset other properties if needed...
    });
  };

  const addItem = () => {
    if (newItemDescription && newItemAmount >= 0 && newItemBalance >= 0) {
      const newItem = {
        description: newItemDescription,
        amount: parseFloat(newItemAmount),
        balance: parseFloat(newItemBalance),
      };
      setSelectedInvoice((prevInvoice) => ({
        ...prevInvoice,
        items: [...prevInvoice.items, newItem],
      }));

      // Clear input fields after adding
      setNewItemDescription("");
      setNewItemAmount(0);
      setNewItemBalance(0);
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  const handlePrint = () => {
    const footer = document.querySelector(".modal-footer");
    const topNav = document.querySelector(".top-nav");

    if (footer) footer.style.display = "none";
    if (topNav) topNav.style.display = "none";

    window.print();

    if (footer) footer.style.display = "";
    if (topNav) topNav.style.display = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav className="top-nav" />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />
        <div
          style={{ flex: 1, padding: "20px", overflowY: "auto", marginTop: 50 }}
        >
          <h2>Invoices</h2>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              marginLeft: "300px",
            }}
          >
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control me-2"
              style={{ width: "600px" }}
            />
            <button
              className="btn btn-primary mx-2"
              onClick={() => navigate("/CreateSourceDocument")}
            >
              Add New Invoice
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => navigate("/CreateSourceDocument")}
            >
              Cash Sale
            </button>
          </div>
          <table
            className="table table-striped table-bordered"
            style={{ width: "75%", marginLeft: "300px" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.customer}</td>
                  <td>{invoice.date}</td>
                  <td>${invoice.total.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => openModal(invoice)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => openEditableModal(invoice)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Viewing Invoice */}
      {modalVisible && selectedInvoice && (
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
                    <p style={{ margin: "2px 0" }}>
                      Date: <span>{selectedInvoice.date}</span>
                    </p>
                    <p style={{ margin: "2px 0" }}>
                      Invoice #: <span>{selectedInvoice.id}</span>
                    </p>
                    <p style={{ margin: "2px 0" }}>
                      Customer ID: <span>{selectedInvoice.customer}</span>
                    </p>
                  </div>
                </div>
                <hr style={{ backgroundColor: "green", height: "2px" }} />
              </div>
            </div>

            {/* Body Section */}
            <div
              className="modal-body"
              style={{ overflowY: "auto", backgroundColor: "white" }}
            >
              <div className="invoice-container" style={{ padding: "20px" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <h3>Billing To:</h3>
                    <h6>Received By: {selectedInvoice.customer}</h6>
                    <p>Address details go here...</p>
                  </div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <h3>Shipping To:</h3>
                    <h6>Received By: {selectedInvoice.customer}</h6>
                    <p>Address details go here...</p>
                  </div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <h2
                      className="invoice-text"
                      style={{
                        color: "red",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      INVOICE
                    </h2>
                    <hr
                      style={{ backgroundColor: "darkblue", height: "2px" }}
                    />
                  </div>
                </div>

                {/* Invoice Items Table */}
                <table
                  className="table table-striped table-bordered"
                  style={{ backgroundColor: "white", marginTop: "20px" }}
                >
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.description}</td>
                        <td>${item.amount.toFixed(2)}</td>
                        <td>${item.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Notes and Summary */}
                <div
                  className="invoice-notes"
                  style={{
                    padding: "20px 0",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <h3>Notes:</h3>
                  <p>{selectedInvoice.notes}</p>
                </div>

                <div
                  className="invoice-summary"
                  style={{
                    textAlign: "right",
                    marginTop: "20px",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <img
                        src="/assets/images/lines (1).jpg"
                        alt="Line 1"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div style={{ textAlign: "left", marginLeft: "20px" }}>
                      <p>Subtotal: ${selectedInvoice.total.toFixed(2)}</p>
                      <p>Sales Tax: {selectedInvoice.salestax}%</p>
                      <p>Total: ${selectedInvoice.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="other-invoice-summary"
                  style={{
                    textAlign: "right",
                    marginTop: "20px",
                    backgroundColor: "white",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <p>Subtotal: ${selectedInvoice.total.toFixed(2)}</p>
                      <p>Interest Rate: {selectedInvoice.interestRate}%</p>
                      <p>Payment Terms: {selectedInvoice.paymentTerms}</p>
                      <p>Payment Type: {selectedInvoice.paymentType}</p>
                      <p>Currency: {selectedInvoice.currency}</p>
                    </div>
                    <div style={{ width: "25%" }}>
                      <img
                        src="/assets/images/lines (2).png"
                        alt="Line 2"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>

                <hr style={{ backgroundColor: "black", height: "2px" }} />

                {/* Bank Details Section */}
                <div style={{ padding: "20px 0", textAlign: "center" }}>
                  <h3 style={{ margin: 0 }}>Bank Details:</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <p style={{ margin: 0 }}>Bank Name: Example Bank</p>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <p style={{ margin: 0 }}>Account Number: 123456789</p>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <p style={{ margin: 0 }}>SWIFT Code: EXAMPLE123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ backgroundColor: "black", height: "2px" }} />

            {/* Footer with Actions */}
            <div className="modal-footer" style={{ marginBottom: 45 }}>
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary mx-2" onClick={handlePrint}>
                Print Invoice
              </button>
              <p style={{ marginLeft: 4, marginRight: 4 }}>Save As:</p>
              <button className="btn btn-primary mx-2" onClick={handlePrint}>
                Quotation
              </button>
              <button className="btn btn-primary" onClick={handlePrint}>
                Proforma Invoice
              </button>
              <button className="btn btn-primary mx-2" onClick={handlePrint}>
                Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editable Modal for Editing Invoice */}
      {editableModalVisible && selectedInvoice && (
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
                    <p style={{ margin: "2px 0" }}>
                      Date: <span>{selectedInvoice.date}</span>
                    </p>
                    <p style={{ margin: "2px 0" }}>
                      Invoice #: <span>{selectedInvoice.id}</span>
                    </p>
                    <p style={{ margin: "2px 0" }}>
                      Customer ID: <span>{selectedInvoice.customer}</span>
                    </p>
                  </div>
                </div>
                <hr style={{ backgroundColor: "green", height: "2px" }} />
              </div>
            </div>

            {/* Body Section */}
            <div
              className="modal-body"
              style={{ overflowY: "auto", backgroundColor: "white" }}
            >
              <div className="invoice-container" style={{ padding: "20px" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <h3>Billing To:</h3>
                    <h6>Received By: {selectedInvoice.customer}</h6>
                    <p>Address details go here...</p>
                  </div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <h3>Shipping To:</h3>
                    <h6>Received By: {selectedInvoice.customer}</h6>
                    <p>Address details go here...</p>
                  </div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <h2
                      className="invoice-text"
                      style={{
                        color: "red",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      INVOICE
                    </h2>
                    <hr
                      style={{ backgroundColor: "darkblue", height: "2px" }}
                    />
                  </div>
                </div>

                {/* Invoice Items Table */}
                <table className="table table-striped table-bordered" style={{ backgroundColor: "white", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {selectedInvoice.items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.description}</td>
            <td>${item.amount.toFixed(2)}</td>
            <td>${item.balance.toFixed(2)}</td>
          </tr>
        ))}
        {/* Row for adding new item */}
        <tr>
          <td>{selectedInvoice.items.length + 1}</td>
          <td>
            <input 
              type="text" 
              placeholder="Item Description" 
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
              style={{ width: "100%" }} 
            />
          </td>
          <td>
            <input 
              type="number" 
              placeholder="Amount" 
              value={newItemAmount}
              onChange={(e) => setNewItemAmount(e.target.value)}
              style={{ width: "100%" }} 
            />
          </td>
          <td>
            <input 
              type="number" 
              placeholder="Balance" 
              value={newItemBalance}
              onChange={(e) => setNewItemBalance(e.target.value)}
              style={{ width: "100%" }} 
            />
          </td>
        </tr>
        {/* Row for the Add Item button */}
        <tr>
          <td colSpan="4" style={{ textAlign: "right" }}>
            <button className="btn btn-primary" onClick={addItem}>
              Add Item
            </button>
          </td>
        </tr>
      </tbody>
    </table>

                {/* Notes and Summary */}
                <div
                  className="invoice-notes"
                  style={{
                    padding: "20px 0",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <h3>Notes:</h3>
                  <p>{selectedInvoice.notes}</p>
                </div>

                <div
                  className="invoice-summary"
                  style={{
                    textAlign: "right",
                    marginTop: "20px",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <img
                        src="/assets/images/lines (1).jpg"
                        alt="Line 1"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div style={{ textAlign: "left", marginLeft: "20px" }}>
                      <p>Subtotal: ${selectedInvoice.total.toFixed(2)}</p>
                      <p>Sales Tax: {selectedInvoice.salestax}%</p>
                      <p>Total: ${selectedInvoice.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="other-invoice-summary"
                  style={{
                    textAlign: "right",
                    marginTop: "20px",
                    backgroundColor: "white",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <p>Subtotal: ${selectedInvoice.total.toFixed(2)}</p>
                      <p>Interest Rate: {selectedInvoice.interestRate}%</p>
                      <p>Payment Terms: {selectedInvoice.paymentTerms}</p>
                      <p>Payment Type: {selectedInvoice.paymentType}</p>
                      <p>Currency: {selectedInvoice.currency}</p>
                    </div>
                    <div style={{ width: "25%" }}>
                      <img
                        src="/assets/images/lines (2).png"
                        alt="Line 2"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>

                <hr style={{ backgroundColor: "black", height: "2px" }} />

                {/* Bank Details Section */}
                <div style={{ padding: "20px 0", textAlign: "center" }}>
                  <h3 style={{ margin: 0 }}>Bank Details:</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <p style={{ margin: 0 }}>Bank Name: Example Bank</p>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <p style={{ margin: 0 }}>Account Number: 123456789</p>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <p style={{ margin: 0 }}>SWIFT Code: EXAMPLE123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ backgroundColor: "black", height: "2px" }} />

            {/* Footer with Actions */}
            <div className="modal-footer" style={{ marginBottom: 45 }}>
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <p style={{ marginLeft: 4, marginRight: 4 }}>Save As:</p>
              <button className="btn btn-primary mx-2" onClick={handlePrint}>
                Quotation
              </button>
              <button className="btn btn-primary" onClick={handlePrint}>
                Proforma Invoice
              </button>
              <button className="btn btn-primary mx-2" onClick={handlePrint}>
                Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
