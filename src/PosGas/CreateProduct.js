import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import Swal from "sweetalert2"; 
import { API_URL } from '../config'; 

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productType: '',
    description: '',
    location: '',
    availabilityDate: '',
    availabilityTime: '',
    unitCost: '',
    volume: '',
    metricMeasurement: '',
    paymentUsing: '',
    paymentWhen: '',
    transportRate: '',
  });

  const [userId, setUserId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [branchId, setBranchId] = useState(null); // State to hold branch_id

  // Fetch user_id, company_id, and branch_id from local storage
  useEffect(() => {
    const storedUserId = localStorage.getItem('user'); // Updated to 'user'
    const storedCompanyId = localStorage.getItem('company_id');
    const storedBranchId = localStorage.getItem('branch_id'); // Fetching branch_id

    console.log('Fetched user_id:', storedUserId);
    console.log('Fetched company_id:', storedCompanyId);
    console.log('Fetched branch_id:', storedBranchId);

    setUserId(storedUserId);
    setCompanyId(storedCompanyId);
    setBranchId(storedBranchId); // Setting branch_id
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotalCost = () => {
    return parseFloat(formData.unitCost) * parseFloat(formData.volume) || 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the object to be sent to the API
    const productObj = {
      user_id: userId, 
      company_id: companyId, 
      branch_id: branchId, // Using branch_id from state
      product_type: formData.productType,
      description: formData.description,
      location: formData.location,
      date: formData.availabilityDate,
      time: formData.availabilityTime,
      unit_cost: parseFloat(formData.unitCost) || 0, 
      volume: parseFloat(formData.volume) || 0, 
      metric_measurement: formData.metricMeasurement || "", 
      payment_using: formData.paymentUsing || "", 
      payment_when: formData.paymentWhen || "", 
      transport_rate: parseFloat(formData.transportRate) || 0, 
      total_cost: calculateTotalCost(),
      customer_user_id: "customer_user_id", // Replace with actual customer user ID
      customer_branch_id: "customer_branch_id", // Replace with actual customer branch ID
      customer_company_id: "customer_company_id" // Replace with actual customer company ID
    };

    // Log the product object
    console.log('Product object to be sent:', productObj);

    // Validate required fields and log missing ones
    const missingFields = [];
    if (!userId) missingFields.push('user_id');
    if (!companyId) missingFields.push('company_id');
    if (!branchId) missingFields.push('branch_id');
    if (!formData.productType) missingFields.push('product_type');
    if (!formData.description) missingFields.push('description');
    if (!formData.location) missingFields.push('location');

    if (missingFields.length > 0) {
      console.warn('Missing fields:', missingFields);
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: `Missing fields: ${missingFields.join(', ')}`,
      });
      return;
    }

    // Send the POST request
    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productObj)
    })
    .then(res => {
      console.log('Response status:', res.status); 
      if (!res.ok) {
        return res.json().then(errorData => {
          throw new Error(`Error: ${errorData.message || res.statusText}`);
        });
      }
      return res.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product saved successfully.',
      }).then(() => {
        navigate('/Ecosystem');
      });
    })
    .catch(err => {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `There was a problem saving the product: ${err.message}`,
      });
    });
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ padding: 10, flex: 1, marginTop: 20, marginBottom: 20, marginTop: 80 }}>
          <h4>Create Product</h4>
          <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Product Type</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control as="select" name="productType" onChange={handleChange} required>
                  <option value="">Select...</option>
                  <option value="LGP Gas">LGP Gas</option>
                  {/* Add more options as needed */}
                </Form.Control>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control type="text" name="description" onChange={handleChange} required />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Location of Goods</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control type="text" name="location" onChange={handleChange} required />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Availability</Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Control type="date" name="availabilityDate" onChange={handleChange} />
              </Col>
              <Col sm={4}>
                <Form.Control type="time" name="availabilityTime" onChange={handleChange} />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Unit Cost</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="unitCost" 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter decimal value" 
                  pattern="^\d+(\.\d{1,2})?$" 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Volume</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control type="number" name="volume" onChange={handleChange} required />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Metric Measurement</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control type="text" name="metricMeasurement" onChange={handleChange} />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Payment Using</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control type="text" name="paymentUsing" onChange={handleChange} />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Payment When</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control type="text" name="paymentWhen" onChange={handleChange} />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Transport Rate</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="transportRate" 
                  onChange={handleChange} 
                  placeholder="Enter decimal value" 
                  pattern="^\d+(\.\d{1,2})?$" 
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Create Product
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProduct;