import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddDeductionRun = () => {
  const navigate = useNavigate();
  const [adddeductionrunRecords, setAddDeductionRunRecords] = useState([]);
  const [formData, setFormData] = useState({
    employee_id:'',
    allowance_id:'',
    payroll_cycle_run_id:'',
    company_id: localStorage.getItem('company_id') || '1',
    amount:'',
    username:'',
    full_name: '' // Store fetched full name
    
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('company_id')) {
      localStorage.setItem('company_id', '1');
    }

    const fetchAddDeductionRunRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_employees`);
        const data = await response.json();
        setAddDeductionRunRecords(data);
      } catch (err) {
        console.error("Error fetching employee records:", err.message);
      }
    };

    fetchAddDeductionRunRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'employee_id') {
      fetchAddDeductionRunRecords(value);
    }
  };

  const fetchAddDeductionRunRecords = async (employee_id) => {
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
    console.log("Sending POST to:", `${API_URL}/hr_deduction_runs`);
    console.log("Payload:", JSON.stringify(formData));

    try {
      const response = await fetch(`${API_URL}/hr_deduction_runs`, {
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
            employee_id:'',
            allowance_id:'',
            payroll_cycle_run_id:'',
            company_id: localStorage.getItem('company_id') || '1',
            amount:'',
            username:'',
            full_name: '' // Store fetched full name
    
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
        <h1>Add Deduction Run</h1>
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
                <Form.Label>Employee ID</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="employee_id" 
                  value={formData.employee_id} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Employee Name</Form.Label>
              </Col>
              <Col sm={8}>
                <label style={{ color: 'grey', textAlign: 'left', display: 'block' }}>{formData.full_name}</label>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Al</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Payroll Cycle Run ID</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="payroll_cycle_run_id" 
                  value={formData.payroll_cycle_run_id} 
                />
              </Col>
            </Row>
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
                <Form.Label>Amount</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Username</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="username" 
                  value={formData.username} 
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

export default AddDeductionRun;