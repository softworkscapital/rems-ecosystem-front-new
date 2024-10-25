import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const BuyProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [volumeToBuy, setVolumeToBuy] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("Harare");
  const [transportCost] = useState(50); // Example transport cost
  const [totalCost, setTotalCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve user data from local storage
  const user_id = localStorage.getItem("user_id");
  const branch_id = localStorage.getItem("branch_id");
  const company_id = localStorage.getItem("company_id");

  const handleVolumeChange = (e) => {
    setVolumeToBuy(e.target.value);
    setErrorMessage(""); // Reset error message on change
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  useEffect(() => {
    if (product) {
      const unitCost = product.unitCost;
      const askingTotal = volumeToBuy * unitCost;
      const total = askingTotal + transportCost;
      setTotalCost(total);
    }
  }, [volumeToBuy, product, transportCost]);

  const handlePurchase = async () => {
    if (volumeToBuy <= 0) {
      setErrorMessage("Volume must be greater than zero.");
      return;
    }
    if (volumeToBuy > product.volume) {
      setErrorMessage("Insufficient volume available.");
      return;
    }

    const purchaseData = {
      product_id: product.id,
      user_id: user_id,
      company_id: company_id,
      branch_id: branch_id,
      product_type: product.type,
      description: product.description,
      location: product.location,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      unit_cost: product.unitCost,
      volume: volumeToBuy,
      metric_measurement: product.metricMeasurement,
      payment_using: "Credit Card (Example)",
      payment_when: "Upon Delivery",
      transport_rate: transportCost,
      total_cost: totalCost.toFixed(2),
      customer_user_id: user_id,
      customer_branch_id: selectedBranch,
      customer_company_id: company_id,
      customer_purchased_amount: volumeToBuy,
    };

    try {
      const purchaseResponse = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      const responseText = await purchaseResponse.text();
      console.log(responseText); // Log the raw response

      if (purchaseResponse.ok) {
        const data = JSON.parse(responseText); // Parse JSON if response is OK
        const updatedVolume = product.volume - volumeToBuy;
        const updatedProductData = {
          volume: updatedVolume,
          total_cost: updatedVolume * product.unitCost + transportCost,
        };

        const updateResponse = await fetch(`${API_URL}/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProductData),
        });

        if (updateResponse.ok) {
          navigate('/ProcessingOrder', { state: { product, volumeToBuy, totalCost, selectedBranch } });
        } else {
          alert("Failed to update product volume.");
        }
      } else {
        const errorData = JSON.parse(responseText);
        alert(`Error: ${errorData.message || 'Purchase failed. Please try again.'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your purchase.");
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Container style={{ padding: 16, flex: 1, marginTop: 70, marginBottom: 80 }}>
          <h4>Processing Order</h4>
          {product && (
            <Card style={{ backgroundColor: '#e9ecef', padding: '30px', borderRadius: '8px', maxWidth: '650px', margin: 'auto', marginLeft: 380 }}>
              <Card.Body>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
                  <Form.Label style={{ marginRight: '10px' }}>Volume to Buy:</Form.Label>
                  <Form.Control
                    type="number"
                    value={volumeToBuy}
                    onChange={handleVolumeChange}
                    placeholder="Enter volume"
                    min="1"
                    max={product.volume}
                    style={{ width: '60%' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
                  <Form.Label style={{ marginRight: '10px' }}>Select Branch:</Form.Label>
                  <Form.Select
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    style={{ width: '60%' }}
                  >
                    <option value="Harare">Select Branch</option>
                    <option value="Harare">Harare</option>
                    <option value="Mutare">Mutare</option>
                  </Form.Select>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Product ID:</strong>
                  <span>{product.id}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Volume:</strong>
                  <span>{volumeToBuy}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Available:</strong>
                  <span>{product.availabilityDate} {product.availabilityTime}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Cost per Unit:</strong>
                  <span>${product.unitCost}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Asking Total:</strong>
                  <span>${(volumeToBuy * product.unitCost).toFixed(2)}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Payment Using:</strong>
                  <span>Credit Card (Example)</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Payment When:</strong>
                  <span>Upon Delivery</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Transport Cost:</strong>
                  <span>${transportCost}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Total Cost on Delivery:</strong>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
                <Button 
                  variant="primary" 
                  onClick={handlePurchase} 
                  style={{ marginTop: '10px', float: 'left' }}
                >
                  Confirm Purchase
                </Button>
              </Card.Body>
            </Card>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default BuyProduct;