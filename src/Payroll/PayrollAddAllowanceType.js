import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddAllowanceType = () => {
  const navigate = useNavigate();
  const [addallowancetypeRecords, setAddallowancetypeRecords] = useState([]);
  const [formData, setFormData] = useState({
    company_id: localStorage.getItem('company_id') || '1',
    allowance_name:'',
    allowance_description:'',
    allowance_code:'',
    cycle:'',
    rate:'',
    charged_on:'',
    
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('company_id')) {
      localStorage.setItem('company_id', '1');
    }

    const fetchAddallowancetypeRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_employees`);
        const data = await response.json();
        setAddallowancetypeRecords(data);
      } catch (err) {
        console.error("Error fetching employee records:", err.message);
      }
    };

    fetchAddallowancetypeRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'employee_id') {
      fetchAddallowancetypeRecords(value);
    }
  };

  const fetchAddallowancetypeRecords = async (employee_id) => {
    if (!employee_id) {
      setFormData((prevData) => ({
        ...prevData,
        full_name: '',
      }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/hr_employees/${employee_id}`);
      if (response.ok) {
        const employee = await response.json();
        console.log("Fetched Employee:", employee); // Log the fetched employee

        // Check if employee is an array and access the first element
        const full_name = Array.isArray(employee) 
          ? `${employee[0].name || ''} ${employee[0].surname || ''}`.trim()
          : `${employee.name || ''} ${employee.surname || ''}`.trim();

        console.log("Full Name Set To:", full_name); // Log the full name being set

        Swal.fire({
          title: 'Success!',
          text: 'Employee is found!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          setFormData((prevData) => ({
            ...prevData,
            full_name: full_name,
          }));
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Employee not found. Please check the Employee ID.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
        setFormData((prevData) => ({
          ...prevData,
          full_name: '',
        }));
      }
    } catch (err) {
      console.error("Error during fetch:", err.message);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred while fetching employee details.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Submit:", formData); // Log form data
    console.log("Sending POST to:", `${API_URL}/hr_allowance_types`);
    console.log("Payload:", JSON.stringify(formData));

    try {
      const response = await fetch(`${API_URL}/hr_allowance_types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newRecord = await response.json();
        console.log("New Record Added:", newRecord); // Log the new record

        setFormData({
            company_id: localStorage.getItem('company_id') || '1',
            allowance_name:'',
            allowance_description:'',
            allowance_code:'',
            cycle:'',
            rate:'',
            charged_on:'',
        });

        Swal.fire({
          title: 'Success!',
          text: 'Allowance record added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/Allowances'); // Navigate back to Allowances page
        });
      } else {
        const errorText = await response.text(); // Get the error message from response
        console.error("Error response:", errorText); // Log error response
        Swal.fire({
          title: 'Error!',
          text: `Failed to add allowance record. Status: ${response.status} - ${errorText}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (err) {
      console.error("Error adding allowance record:", err.message);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Add Allowance Type</h1>
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
                <Form.Label>Allowance Name</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="allowance_name" 
                  value={formData.allowance_name} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Allowance Description</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="allowance_description" 
                  value={formData.allowance_description} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Allowance Code</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="allowance_code" 
                  value={formData.allowance_code} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Cycle</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="cycle" 
                  value={formData.cycle} 
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
                <Form.Label>charged On</Form.Label>
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
                    Add Allowance Type
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

export default AddAllowanceType;