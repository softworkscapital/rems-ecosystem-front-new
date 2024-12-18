import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddEmployeeDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    account_type: '',
    name: '',
    surname: '',
    idnumber: '',
    sex: '',
    dob: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    workindustry: '',
    workaddress: '',
    workphone: '',
    workphone2: ''
  });

  const [companyId, setCompanyId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCompanyId = async () => {
      const storedCompanyId = localStorage.getItem('company_id') || '1';
      setCompanyId(storedCompanyId);
    };

    fetchCompanyId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.surname) newErrors.surname = "Surname is required.";
    if (!formData.idnumber) newErrors.idnumber = "ID Number is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.workindustry) newErrors.workindustry = "Work Industry is required.";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Email format is invalid.";
    }

    const phonePattern = /^[0-9]*$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must be numeric.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    const employeeData = { ...formData, company_id: companyId };
    console.log("Posting the following employee details:", employeeData);

    try {
      const response = await fetch(`${API_URL}/hr_employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        await response.json();
        setFormData({
          account_type: '',
          name: '',
          surname: '',
          idnumber: '',
          sex: '',
          dob: '',
          address: '',
          city: '',
          country: '',
          phone: '',
          email: '',
          workindustry: '',
          workaddress: '',
          workphone: '',
          workphone2: ''
        });

        Swal.fire({
          title: 'Success!',
          text: 'Employee record added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/EmployeeDetails');
        });
      } else {
        console.error("Error adding employee record:", response.statusText);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add employee record. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (err) {
      console.error("Error adding employee record:", err.message);
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
        <h1>Add Employee Record</h1>
        <div className="col-xl-12">
          <Form 
            onSubmit={handleSubmit} 
            style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}
          >

            {/* Account Type Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Account Type</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="account_type" 
                  value={formData.account_type} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* Name Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Name</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  isInvalid={!!errors.name} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* Surname Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Surname</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="surname" 
                  value={formData.surname} 
                  onChange={handleChange} 
                  isInvalid={!!errors.surname} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.surname}
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* ID Number Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>ID Number</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="idnumber" 
                  value={formData.idnumber} 
                  onChange={handleChange} 
                  isInvalid={!!errors.idnumber} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.idnumber}
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* Sex Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Sex</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="sex" 
                  value={formData.sex} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* Date of Birth Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Date of Birth</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* Address Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Address</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* City Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>City</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* Country Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Country</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* Phone Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Phone</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  isInvalid={!!errors.phone} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* Email Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Email</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  isInvalid={!!errors.email} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* Work Industry Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Work Industry</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="workindustry" 
                  value={formData.workindustry} 
                  onChange={handleChange} 
                  isInvalid={!!errors.workindustry} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.workindustry}
                </Form.Control.Feedback>
              </Col>
            </Row>

            {/* Work Address Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Work Address</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="workaddress" 
                  value={formData.workaddress} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* Work Phone Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Work Phone</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="workphone" 
                  value={formData.workphone} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>

            {/* Work Phone 2 Field */}
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Work Phone 2</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="workphone2" 
                  value={formData.workphone2} 
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
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ width: '100%' }}
                  >
                    Add Employee Record
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

export default AddEmployeeDetail;