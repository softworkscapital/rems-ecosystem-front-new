import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddTimeKeeping = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clock_date: '',
    clock_in_time: '',
    clock_out_time: '',
    employee_id: '',
    status: '',
    notes: '',
    company_id: localStorage.getItem('company_id') || '1' // Fetch from local storage or default to '1'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.clock_date) newErrors.clock_date = "Clock Date is required.";
    if (!formData.clock_in_time) newErrors.clock_in_time = "Clock In Time is required.";
    if (!formData.clock_out_time) newErrors.clock_out_time = "Clock Out Time is required.";
    if (!formData.employee_id) newErrors.employee_id = "Employee ID is required.";
    if (!formData.status) newErrors.status = "Status is required.";

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

    const timeKeepingData = {
      ...formData,
      hr_time_keeping_id: '', // Assuming this is auto-generated on the server
    };

    try {
      const response = await fetch(`${API_URL}/hr_time_keeping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeKeepingData),
      });

      if (response.ok) {
        await response.json();
        setFormData({
          clock_date: '',
          clock_in_time: '',
          clock_out_time: '',
          employee_id: '',
          status: '',
          notes: '',
          company_id: localStorage.getItem('company_id') || '1' // Retain the company ID from local storage
        });
        Swal.fire({
          title: 'Success!',
          text: 'Timekeeping record added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/TimeKeepings'); // Redirect to the records page
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add timekeeping record. Please try again.',
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
          <h1>Add Time Keeping</h1>
          <div className="col-xl-12">
            <Form 
              onSubmit={handleSubmit} 
              style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}
            >
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

              {/* Clock Date Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Clock Date</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="date" 
                    name="clock_date" 
                    value={formData.clock_date} 
                    onChange={handleChange} 
                    isInvalid={!!errors.clock_date} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.clock_date}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Clock In Time Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Clock In Time</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="time" 
                    name="clock_in_time" 
                    value={formData.clock_in_time} 
                    onChange={handleChange} 
                    isInvalid={!!errors.clock_in_time} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.clock_in_time}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Clock Out Time Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Clock Out Time</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="time" 
                    name="clock_out_time" 
                    value={formData.clock_out_time} 
                    onChange={handleChange} 
                    isInvalid={!!errors.clock_out_time} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.clock_out_time}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Employee ID Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Employee ID</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="employee_id" 
                    value={formData.employee_id} 
                    onChange={handleChange} 
                    isInvalid={!!errors.employee_id} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.employee_id}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Status Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Status</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange} 
                    isInvalid={!!errors.status} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Notes Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Notes</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    as="textarea" 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleChange} 
                    rows={3}
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
                      Add Time Keeping
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

export default AddTimeKeeping;