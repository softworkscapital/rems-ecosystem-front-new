import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PayrollAddBankDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    bank_name: '',
    acc_name: '',
    acc_number: '',
    branch_name: '',
    branch_code: '',
    swift_code: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If employee_id changes, fetch the full name
    if (name === "employee_id") {
      fetchEmployeeFullName(value);
    }
  };

  const fetchEmployeeFullName = async (employeeId) => {
    if (employeeId.trim() === '') {
      setFormData((prev) => ({ ...prev, full_name: '' }));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/hr_employees?employee_id=${employeeId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const { name, surname } = data[0]; // Assuming the response has these fields
          setFormData((prev) => ({ ...prev, full_name: `${name} ${surname}` }));
        } else {
          setFormData((prev) => ({ ...prev, full_name: '' }));
          Swal.fire({
            title: 'Error!',
            text: 'Employee ID not found.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch employee data. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.employee_id) newErrors.employee_id = "Employee ID is required.";
    if (!formData.full_name) newErrors.full_name = "Full Name is required.";
    if (!formData.bank_name) newErrors.bank_name = "Bank Name is required.";
    if (!formData.acc_name) newErrors.acc_name = "Account Name is required.";
    if (!formData.acc_number) newErrors.acc_number = "Account Number is required.";
    if (!formData.branch_name) newErrors.branch_name = "Branch Name is required.";
    if (!formData.branch_code) newErrors.branch_code = "Branch Code is required.";
    if (!formData.swift_code) newErrors.swift_code = "SWIFT Code is required.";

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

    const bankDetailData = {
      ...formData,
      hr_bank_id: '', // Assuming this is auto-generated on the server
    };

    try {
      const response = await fetch(`${API_URL}/hr_banks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankDetailData),
      });

      if (response.ok) {
        await response.json();
        setFormData({
          employee_id: '',
          full_name: '',
          bank_name: '',
          acc_name: '',
          acc_number: '',
          branch_name: '',
          branch_code: '',
          swift_code: '',
        });
        Swal.fire({
          title: 'Success!',
          text: 'Bank detail added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/Banks'); // Redirect to the bank details page
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add bank detail. Please try again.',
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
          <h1>Add Bank Detail</h1>
          <div className="col-xl-12">
            <Form 
              onSubmit={handleSubmit} 
              style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}
            >
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

              {/* Full Name Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Full Name</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="full_name" 
                    value={formData.full_name} 
                    readOnly 
                  />
                </Col>
              </Row>

              {/* Bank Name Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Bank Name</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="bank_name" 
                    value={formData.bank_name} 
                    onChange={handleChange} 
                    isInvalid={!!errors.bank_name} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.bank_name}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Account Name Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Account Name</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="acc_name" 
                    value={formData.acc_name} 
                    onChange={handleChange} 
                    isInvalid={!!errors.acc_name} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.acc_name}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Account Number Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Account Number</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="acc_number" 
                    value={formData.acc_number} 
                    onChange={handleChange} 
                    isInvalid={!!errors.acc_number} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.acc_number}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Branch Name Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Branch Name</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="branch_name" 
                    value={formData.branch_name} 
                    onChange={handleChange} 
                    isInvalid={!!errors.branch_name} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.branch_name}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Branch Code Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Branch Code</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="branch_code" 
                    value={formData.branch_code} 
                    onChange={handleChange} 
                    isInvalid={!!errors.branch_code} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.branch_code}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* SWIFT Code Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>SWIFT Code</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="swift_code" 
                    value={formData.swift_code} 
                    onChange={handleChange} 
                    isInvalid={!!errors.swift_code} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.swift_code}
                  </Form.Control.Feedback>
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
                      Add Bank Detail
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

export default PayrollAddBankDetail;