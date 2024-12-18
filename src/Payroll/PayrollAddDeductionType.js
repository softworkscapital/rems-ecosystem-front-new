import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddDeductionType = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_id: localStorage.getItem('company_id') || '1',
    deduction_name: '',
    description: '',
    deduction_code: '',
    cycle_period: '',
    rate: '',
    charged_on: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Submit:", formData);

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/hr_deduction_types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newRecord = await response.json();
        console.log("New Record Added:", newRecord);

        // Reset form data
        setFormData({
          company_id: localStorage.getItem('company_id') || '1',
          deduction_name: '',
          description: '',
          deduction_code: '',
          cycle_period: '',
          rate: '',
          charged_on: '',
        });

        Swal.fire({
          title: 'Success!',
          text: 'Deduction record added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/DeductionType'); // Navigate back to Deduction page
        });
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        Swal.fire({
          title: 'Error!',
          text: `Failed to add deduction record. Status: ${response.status} - ${errorText}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (err) {
      console.error("Error adding deduction record:", err.message);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Add Deduction Type</h1>
        <div className="col-xl-12">
          <Form 
            onSubmit={handleSubmit} 
            style={{ 
              maxWidth: '500px', 
              margin: '0 auto', 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '5px',
              marginBottom: '20px' 
            }}
          >
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Company ID</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="company_id" 
                  value={formData.company_id} 
                  readOnly 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Deduction Name</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="deduction_name" 
                  value={formData.deduction_name} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Deduction Code</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="deduction_code" 
                  value={formData.deduction_code} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Cycle Period</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="cycle_period" 
                  value={formData.cycle_period} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Rate</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="rate" 
                  value={formData.rate} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Charged On</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="date" 
                  name="charged_on" 
                  value={formData.charged_on} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={12}>
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                    <Spinner animation="border" role="status" />
                    <span style={{ marginLeft: '10px' }}>Loading...</span>
                  </div>
                ) : (
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ width: '100%' }}
                  >
                    Add Deduction Type
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddDeductionType;