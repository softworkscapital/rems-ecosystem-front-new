import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import { Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_URL } from "../config"; // Import your API_URL config

const CashSale = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    productId: "",
    description: "",
    amount: 0,
    quantity: 1, // Set default quantity to 1
  });
  const [paymentTerms, setPaymentTerms] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [currency, setCurrency] = useState("");
  const [interestRate, setInterestRate] = useState(5);
  const [products, setProducts] = useState([]); // State for products
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [customers, setCustomers] = useState([]); // State for fetched customers
  const [saleDescription, setSaleDescription] = useState(""); // New state for sale description
  const [additionalDescription, setAdditionalDescription] = useState(""); // New state for additional description

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL}/customers`);
        const data = await response.json();
        setCustomers(data); // Save fetched customers in state
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/productdefinition/full_products_definations`);
        const data = await response.json();
        setProducts(data); // Save all products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomers();
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
      quantity: 1, // Reset quantity to 1 when searching
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
      quantity: 1, // Set default quantity to 1 when a product is selected
    });
    setFilteredProducts([]); 
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 1; // Default to 1 if invalid input
    setNewItem((prevItem) => ({
      ...prevItem,
      quantity,
    }));
  };

  const handleAddItem = () => {
    if (newItem.productId && newItem.description && newItem.amount > 0 && newItem.quantity > 0) {
      setItems([...items, newItem]);
      setNewItem({ productId: "", description: "", amount: 0, quantity: 1 }); // Reset new item
      setFilteredProducts([]); 
    } else {
      Swal.fire("Warning", "Please fill out all item fields correctly.", "warning");
    }
  };

  const handleViewInvoice = () => {
    if (items.length === 0) {
      Swal.fire("Warning", "No goods selected. Please add items to proceed.", "warning");
      return; // Prevent navigation if no items are selected
    }

    navigate("/CashSaleReview", {
      state: {
        customer: {
          name: "Mr. Siba Prasad Behera", // Replace with actual customer data
          location: "Bhubneswar", // Replace with actual customer data
          id: selectedCustomer, // Assuming this is the ID of the selected customer
        },
        items: items.map(item => ({
          description: item.description,
          amount: item.amount,
          balance: item.amount * item.quantity, // Assuming balance is the total amount
          quantity: item.quantity, // Add quantity if needed
        })),
        saleDescription, // Include the sale description
        additionalDescription, // Include any additional description
        interestRate,
        paymentTerms,
        paymentType,
        currency,
      },
    });
  };

  return (
    <div>
      <TopNav />
      <SideBar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-start d-block mt-5">Select a customer:</label>
              <select
                value={selectedCustomer}
                onChange={handleCustomerChange}
                className="form-control"
              >
                <option value="">Select a customer</option>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} {/* Display the customer name */}
                    </option>
                  ))
                ) : (
                  <option disabled>No customers available</option>
                )}
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
                  <label className="text-start d-block">Unit Price:</label>
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
                        <th>Unit Price</th>
                        <th>Total Price</th>
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
                          <td>{(item.amount * item.quantity).toFixed(2)}</td> {/* Total Price */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            )}

            {/* Sale Description */}
            <div className="form-group mt-3">
              <label className="text-start d-block">Sale Description:</label>
              <input
                type="text"
                value={saleDescription}
                onChange={(e) => setSaleDescription(e.target.value)}
                className="form-control"
                placeholder="Enter a description for the sale"
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

            {/* Additional Description */}
            <div className="form-group mt-3">
              <label className="text-start d-block">Additional Description (Optional):</label>
              <input
                type="text"
                value={additionalDescription}
                onChange={(e) => setAdditionalDescription(e.target.value)}
                className="form-control"
                placeholder="Add any additional notes or description"
              />
            </div>

            {/* View Sale Button */}
            <div className="d-flex justify-content-start mt-4 mb-5">
              <Button className="btn btn-primary" onClick={handleViewInvoice}>
                View Sale
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashSale;