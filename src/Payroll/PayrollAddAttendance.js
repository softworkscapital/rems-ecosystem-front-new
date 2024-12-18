import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const PayrollAddAttendanceRecord = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    payroll_cycle_run_id: '',
    company_id: localStorage.getItem('company_id') || '1', // Get from local storage (default to '1')
    payroll_run_from: '',
    payroll_run_end: '',
    expected_days: '',
    actual_days: '',
    full_name: '' // Store fetched full name
  });
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Set company ID in local storage if it doesn't exist
    if (!localStorage.getItem('company_id')) {
      localStorage.setItem('company_id', '1');
    }

    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_attendances`);
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (err) {
        console.error("Error fetching attendance records:", err.message);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If the employee_id is changed, fetch employee details
    if (name === 'employee_id') {
      fetchAttendanceDetails(value);
    }
  };

  const fetchAttendanceDetails = async (employee_id) => {
    if (!employee_id) {
      setFormData((prevData) => ({
        ...prevData,
        full_name: '',
      }));
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${API_URL}/hr_employees/${employee_id}`);
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
          text: 'Employee not found. Please check the employee ID.',
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
      const { 
        employee_id,
        payroll_cycle_run_id,
        company_id, 
        payroll_run_from,
        payroll_run_end,
        expected_days,
        actual_days 
      } = formData;

      const payload = {
        employee_id,
        payroll_cycle_run_id,
        company_id, 
        payroll_run_from,
        payroll_run_end,
        expected_days,
        actual_days,
      };

      console.log("Payload to be sent:", payload);

      const response = await fetch(`${API_URL}/hr_attendances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newRecord = await response.json();
        console.log("Record added:", newRecord);
        setAttendanceRecords([...attendanceRecords, newRecord]);
        setFormData({ // Reset form after submission
          employee_id: '',
          payroll_cycle_run_id: '',
          company_id: localStorage.getItem('company_id') || '1',
          payroll_run_from: '',
          payroll_run_end: '',
          expected_days: '',
          actual_days: '',
          full_name: '',
        });

        Swal.fire({
          title: 'Success!',
          text: 'Attendance record added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          navigate('/Attendances');
        });
      } else {
        const errorText = await response.text();
        console.error("Error adding attendance record:", response.statusText, errorText);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add attendance record. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    } catch (err) {
      console.error("Error adding attendance record:", err.message);
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
        <h1>Attendance Records</h1>
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
                <Form.Label>Full Name</Form.Label>
              </Col>
              <Col sm={8}>
                <label style={{ color: 'grey', textAlign: 'left', display: 'block' }}>{formData.full_name}</label>
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
                <Form.Label>Payroll Run From</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="date" 
                  name="payroll_run_from" 
                  value={formData.payroll_run_from} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Payroll Run End</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control 
                  type="date" 
                  name="payroll_run_end" 
                  value={formData.payroll_run_end} 
                  onChange={handleChange} 
                  required 
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Expected Days</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  name="expected_days" 
                  value={formData.expected_days} 
                  onChange={handleChange} 
                  required
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}>
                <Form.Label>Actual Days</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  name="actual_days" 
                  value={formData.actual_days} 
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
                    Add Attendance Record
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

export default PayrollAddAttendanceRecord;