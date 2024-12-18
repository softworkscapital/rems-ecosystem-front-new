import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddPayScale = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    grade_id: '',
    company_id: localStorage.getItem('company_id') || '1', // Fetch from local storage
    standard_hour_rate: '',
    overtime_hourly_rate: '',
    special_hourly_rate: '',
    custom_alpha_rate: '',
    custom_beta_rate: '',
    custom_theta_rate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.grade_id) newErrors.grade_id = "Grade ID is required.";
    if (!formData.standard_hour_rate) newErrors.standard_hour_rate = "Standard Hour Rate is required.";
    if (!formData.overtime_hourly_rate) newErrors.overtime_hourly_rate = "Overtime Hourly Rate is required.";
    if (!formData.special_hourly_rate) newErrors.special_hourly_rate = "Special Hourly Rate is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return; // Stop the submission if validation fails
    }

    try {
      const response = await fetch(`${API_URL}/hr_pay_scales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await response.json();
        Swal.fire({
          title: 'Success!',
          text: 'Pay scale added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/PayScales'); // Redirect to the PayScales page
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add pay scale. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (err) {
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
      <div style={{ display: 'flex', width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <div style={{ flex: 1 }}>
          <h1>Add Pay Scale</h1>
          <div className="col-xl-12">
            <Form 
              onSubmit={handleSubmit} 
              style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}
            >
              {/* Grade ID Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Grade ID</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="grade_id" 
                    value={formData.grade_id} 
                    onChange={handleChange} 
                    isInvalid={!!errors.grade_id} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.grade_id}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Company ID Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Company ID</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="company_id" 
                    value={formData.company_id} 
                    readOnly // Make it read-only since it's fetched from local storage
                  />
                </Col>
              </Row>

              {/* Standard Hour Rate Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Standard Hour Rate</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="number" 
                    name="standard_hour_rate" 
                    value={formData.standard_hour_rate} 
                    onChange={handleChange} 
                    isInvalid={!!errors.standard_hour_rate} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.standard_hour_rate}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Overtime Hourly Rate Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Overtime Hourly Rate</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="number" 
                    name="overtime_hourly_rate" 
                    value={formData.overtime_hourly_rate} 
                    onChange={handleChange} 
                    isInvalid={!!errors.overtime_hourly_rate} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.overtime_hourly_rate}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Special Hourly Rate Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Special Hourly Rate</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="number" 
                    name="special_hourly_rate" 
                    value={formData.special_hourly_rate} 
                    onChange={handleChange} 
                    isInvalid={!!errors.special_hourly_rate} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.special_hourly_rate}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Custom Alpha Rate Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Custom Alpha Rate</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="number" 
                    name="custom_alpha_rate" 
                    value={formData.custom_alpha_rate} 
                    onChange={handleChange} 
                  />
                </Col>
              </Row>

              {/* Custom Beta Rate Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Custom Beta Rate</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="number" 
                    name="custom_beta_rate" 
                    value={formData.custom_beta_rate} 
                    onChange={handleChange} 
                  />
                </Col>
              </Row>

              {/* Custom Theta Rate Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Custom Theta Rate</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="number" 
                    name="custom_theta_rate" 
                    value={formData.custom_theta_rate} 
                    onChange={handleChange} 
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
                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                      Add Pay Scale
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddPayScale;