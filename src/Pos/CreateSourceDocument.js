import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_URL } from "../config"; // Import your API_URL config

const CreateSourceDocument = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    productId: "",
    description: "",
    amount: 0,
    quantity: 0,
  });
  const [notes, setNotes] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [currency, setCurrency] = useState("");
  const [interestRate, setInterestRate] = useState(5);
  const [products, setProducts] = useState([]); // State for products
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  const navigate = useNavigate();

  const customers = [
    { id: 1, name: "Mr Siba Prasad Behera", location: "Bhubneswar", interestRate: 5 },
    { id: 2, name: "Jane Doe", location: "New York", interestRate: 7 },
    { id: 3, name: "John Smith", location: "London", interestRate: 6 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/productdefinition/full_products_definations`);
        const data = await response.json();
        setProducts(data); // Save all products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    setSelectedCustomer(customerId);
    const customer = customers.find((c) => c.id.toString() === customerId);
    setInterestRate(customer?.interestRate || 5);
  };

  const handleProductSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setNewItem((prevItem) => ({
      ...prevItem,
      productId: "",
      description: "",
      amount: 0,
    }));
    setFilteredProducts(
      products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm)
      )
    );
  };

  const handleProductSelect = (product) => {
    setNewItem({
      productId: product.product_id,
      description: product.product_name,
      amount: product.unit_size, 
      quantity: 0,
    });
    setFilteredProducts([]); // Clear the product list after selection
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    setNewItem((prevItem) => ({
      ...prevItem,
      quantity,
    }));
  };

  const handleAddItem = () => {
    if (newItem.productId && newItem.description && newItem.amount > 0 && newItem.quantity > 0) {
      setItems([...items, newItem]);
      setNewItem({ productId: "", description: "", amount: 0, quantity: 0 });
      setFilteredProducts([]); // Clear filtered products after adding an item
    } else {
      Swal.fire("Warning", "Please fill out all item fields correctly.", "warning");
    }
  };

  const handleViewInvoice = () => {
    navigate("/InvoiceReview");
  };

  return (
    <div>
      <TopNav />
      <SideBar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {/* Customer Selection */}
            <div className="form-group">
              <label className="text-start d-block mt-5">Select a customer:</label>
              <select
                value={selectedCustomer}
                onChange={handleCustomerChange}
                className="form-control"
              >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Interest Rate Display */}
            <div className="form-group mt-3">
              <label className="text-start d-block">Interest Rate:</label>
              <input
                type="text"
                value={`${interestRate}`}
                className="form-control"
                readOnly
              />
            </div>

            {/* Add Item Section */}
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Add Item</Card.Title>
                <div className="form-group">
                  <label className="text-start d-block">Search Product:</label>
                  <input
                    type="text"
                    onChange={handleProductSearch}
                    className="form-control"
                    placeholder="Type to search for a product"
                  />
                </div>
                {filteredProducts.length > 0 && (
                  <ul className="list-group mt-2" style={{ maxHeight: '150px', overflowY: 'auto', textAlign:'Left' }}>
                    {filteredProducts.map((product) => (
                      <li
                        key={product.product_id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleProductSelect(product)}
                        style={{ cursor: "pointer" }}
                      >
                        {product.product_brand}  {product.product_name}  {product.unit_size}  {product.unit_of_measure}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="form-group mt-2">
                  <label className="text-start d-block">Quantity:</label>
                  <input
                    type="number"
                    onChange={handleQuantityChange}
                    className="form-control"
                    min="1"
                    value={newItem.quantity}
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="text-start d-block">Item Description:</label>
                  <input
                    type="text"
                    value={newItem.description}
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group mt-2">
                  <label className="text-start d-block">Amount:</label>
                  <input
                    type="number"
                    value={newItem.amount}
                    className="form-control"
                    readOnly
                  />
                </div>
                <Button className="btn btn-primary mt-3" onClick={handleAddItem}>
                  Add Item
                </Button>
              </Card.Body>
            </Card>

            {/* Table to Show Entered Items */}
            {items.length > 0 && (
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title>Entered Items</Card.Title>
                  <table className="table table-striped table-bordered">
                    <thead className="bg-info text-white">
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.description}</td>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            )}

            {/* Notes Section */}
            <div className="form-group mt-4">
              <label className="text-start d-block">Notes:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-control"
                rows="3"
              />
            </div>

            {/* Payment Terms */}
            <div className="form-group mt-3">
              <label className="text-start d-block">Payment Terms:</label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="form-control"
              >
                <option value="">Select Payment Terms</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Cash Before Delivery">Cash Before Delivery</option>
              </select>
            </div>

            {/* Payment Type */}
            <div className="form-group mt-3">
              <label className="text-start d-block">Payment Type:</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="form-control"
              >
                <option value="">Select Payment Type</option>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
              </select>
            </div>

            {/* Currency */}
            <div className="form-group mt-3">
              <label className="text-start d-block">Currency:</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="form-control"
              >
                <option value="">Select Currency</option>
                <option value="USD">USD</option>
                <option value="ZAR">ZAR</option>
                <option value="ZIG">ZIG</option>
              </select>
            </div>

            {/* View Invoice Button */}
            <div className="d-flex justify-content-start mt-4 mb-5">
              <Button className="btn btn-primary" onClick={handleViewInvoice}>
                View Document
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSourceDocument;