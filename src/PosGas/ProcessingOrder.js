import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import TopNav from "../TopNav";
import SideBar from "./SideBar";
import Footer from "../Footer";

const ProcessingOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, volumeToBuy, totalCost } = location.state || {};

  const totalWeight = volumeToBuy; // Assuming volumeToBuy is in kg for this example
  const bondAmount = 100; // Example bond amount
  const totalBalance = totalCost + bondAmount;

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Container style={{ padding: 16, flex: 1, marginTop: 70, marginBottom: 80 }}>
          <h4>Processing Order</h4>
          <Card style={{ backgroundColor: '#e9ecef', padding: '30px', borderRadius: '8px', maxWidth: '500px', margin: 'auto' }}>
            <Card.Body>
              <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Product ID:</strong>
                <span>{product.id}</span>
              </div>
              <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Total Kgs:</strong>
                <span>{totalWeight} kg</span>
              </div>
              <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Total Amount:</strong>
                <span>${totalCost.toFixed(2)}</span>
              </div>
              <hr style={{ margin: '20px 0' }} />
              <p>Transport and Bond Payment to facilitate release completion and release of product balance is payable upon delivery.</p>
              <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Total Weight:</strong>
                <span>{totalWeight} kg</span>
              </div>
              <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Bond:</strong>
                <span>${bondAmount}</span>
              </div>
              <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <strong>Total Balance:</strong>
                <span>${totalBalance.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                <Button 
                  variant="success" 
                  onClick={() => navigate('/')} // Navigate to home or another page
                >
                  Continue
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ProcessingOrder;