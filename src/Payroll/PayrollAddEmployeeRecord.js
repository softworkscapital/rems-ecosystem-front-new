import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './component/beautiful.css'; // Import custom CSS

const AddEmployeeRecord = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [formData, setFormData] = useState({
    hr_employee_id: '',
    company_id: localStorage.getItem('company_id') || '1', // Get from local storage (default to '1')
    date: '',
    time: '',
    record_type: '',
    created_by: '',
    approved_by: '',
    file_location: '',
    full_name: '' // Store fetched full name
  });
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Set company ID in local storage if it doesn't exist
    if (!localStorage.getItem('company_id')) {
      localStorage.setItem('company_id', '1');
    }

    const fetchEmployeeRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_employee_records`);
        const data = await response.json();
        setEmployeeRecords(data);
      } catch (err) {
        console.error("Error fetching employee records:", err.message);
      }
    };

    fetchEmployeeRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If the hr_employee_id is changed, fetch employee details
    if (name === 'hr_employee_id') {
      fetchEmployeeDetails(value);
    }
  };

  const fetchEmployeeDetails = async (hr_employee_id) => {
    if (!hr_employee_id) {
      setFormData((prevData) => ({
        ...prevData,
        full_name: '',
      }));
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${API_URL}/hr_employees/${hr_employee_id}`);
      if (response.ok) {
        const employees = await response.json(); // Assuming this is an array
        if (employees.length > 0) {
          const employee = employees[0]; // Access the first object
          const full_name = `${employee.name} ${employee.surname}`; // Combine name and surname

          // Show success message
          Swal.fire({
            title: 'Success!',
            text: 'Employee is found!',
            icon: 'success',
            confirmButtonText: 'Okay'
          }).then(() => {
            // Update the form data state with fetched full name after the user acknowledges
            setFormData((prevData) => ({
              ...prevData,
              full_name: full_name || '',
            }));
          });
        } else {
          console.error("No employee found for the given ID.");
          Swal.fire({
            title: 'Error!',
            text: 'No employee found for the given ID.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
          setFormData((prevData) => ({
            ...prevData,
            full_name: '',
          }));
        }
      } else {
        console.error("Error fetching employee:", response.statusText);
        Swal.fire({
          title: 'Error!',
          text: 'Employee not found. Please check the HR employee ID.',
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
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { hr_employee_id, company_id, date, time, record_type, created_by, approved_by, file_location } = formData;

      const response = await fetch(`${API_URL}/hr_employee_records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hr_employee_id, // Include the HR employee ID
          company_id, // Include the company ID from local storage
          date,
          time,
          record_type,
          created_by,
          approved_by,
          file_location
          // Exclude full name from submission
        }),
      });

      if (response.ok) {
        const newRecord = await response.json();
        setEmployeeRecords([...employeeRecords, newRecord]);
        setFormData({ // Reset form after submission
          hr_employee_id: '',
          company_id: localStorage.getItem('company_id') || '1', // Reset to company ID from local storage
          date: '',
          time: '',
          record_type: '',
          created_by: '',
          approved_by: '',
          file_location: '',
          full_name: '', // Reset full name
        });

        Swal.fire({
          title: 'Success!',
          text: 'Employee record added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/EmployeeRecords'); // Navigate back to EmployeeRecords page
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
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Employee Records</h1>
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
                  name="hr_employee_id" 
                  value={formData.hr_employee_id} 
                  onChange={handleChange} 
                  required 
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
                <Form.Label>Full Name</Form.Label>
              </Col>
              <Col sm={8}>
                <label style={{ color: 'grey', textAlign: 'left', display: 'block' }}>{formData.full_name}</label>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Date</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Time</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Record Type</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Select 
                  name="record_type" 
                  value={formData.record_type} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Record Type</option>
                  <option value="Academic High School">Academic High School</option>
                  <option value="Academic Tertiary">Academic Tertiary</option>
                  <option value="Further Studies">Further Studies</option>
                  <option value="Work Experience">Work Experience</option>
                  <option value="Further Certifications">Further Certifications</option>
                  <option value="Recognitions">Recognitions</option>
                  <option value="Disciplinary">Disciplinary</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Created By</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="created_by" 
                  value={formData.created_by} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Approved By</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="approved_by" 
                  value={formData.approved_by} 
                  onChange={handleChange} 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>File Location</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="text" 
                  name="file_location" 
                  value={formData.file_location} 
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

export default AddEmployeeRecord;