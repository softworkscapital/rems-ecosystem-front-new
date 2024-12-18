import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Form, Button, Row, Col, Spinner, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddEmployeeRole = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    report_to: '',
    grade_id: '',
    created_by: '', // This will be empty for user input
    created_date: '', // Added field
    created_time: '', // Added field
    company_id: '1' // Hardcoded company ID
  });

  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]); // State to hold roles fetched from API
  const [rolesLoading, setRolesLoading] = useState(true); // Loading state for roles

  useEffect(() => {
    fetchRoles(); // Fetch roles on component mount
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`http://localhost:3004/hr_employee_roles/get_roles_by_company_id/${formData.company_id}`);
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch roles. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    } finally {
      setRolesLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Role is required.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.report_to) newErrors.report_to = "Report To is required.";
    if (!formData.grade_id) newErrors.grade_id = "Grade ID is required.";
    if (!formData.created_date) newErrors.created_date = "Created Date is required.";
    if (!formData.created_time) newErrors.created_time = "Created Time is required.";

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

    const employeeRoleData = {
      ...formData,
      created_date: new Date().toISOString().split('T')[0],
      created_time: new Date().toISOString().split('T')[1].split('.')[0]
    };

    try {
      const response = await fetch(`${API_URL}/hr_employee_roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeRoleData),
      });

      if (response.ok) {
        await response.json();
        setFormData({
          role: '',
          name: '',
          report_to: '',
          grade_id: '',
          created_by: '', // Reset this to empty for user input
          created_date: '', // Reset created date
          created_time: '', // Reset created time
          company_id: '1' // Retain the hardcoded company ID
        });
        Swal.fire({
          title: 'Success!',
          text: 'Employee role record added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        }).then(() => {
          fetchRoles(); // Refresh the roles after adding a new one
          navigate('/EmployeeRoles');
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add employee role record. Please try again.',
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
          <h1>Add Employee Role</h1>
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
                    readOnly // Make it read-only since it's hardcoded
                  />
                </Col>
              </Row>

              {/* Created By Field */}
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
                    isInvalid={!!errors.created_by} // Optional error handling
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.created_by}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Role Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Role</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    isInvalid={!!errors.role} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
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

              {/* Report To Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Report To</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="text" 
                    name="report_to" 
                    value={formData.report_to} 
                    onChange={handleChange} 
                    isInvalid={!!errors.report_to} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.report_to}
                  </Form.Control.Feedback>
                </Col>
              </Row>

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

              {/* Created Date Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Created Date</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="date" 
                    name="created_date" 
                    value={formData.created_date} 
                    onChange={handleChange} 
                    isInvalid={!!errors.created_date} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.created_date}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {/* Created Time Field */}
              <Row className="mb-2">
                <Col sm={4}>
                  <Form.Label>Created Time</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control 
                    type="time" 
                    name="created_time" 
                    value={formData.created_time} 
                    onChange={handleChange} 
                    isInvalid={!!errors.created_time} 
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.created_time}
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
                      Add Employee Role
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        {/* Roles Table */}
        <div style={{ flex: 1, marginLeft: '20px', marginTop: '10px' }}>
          <h2>Employee Roles</h2>
          {rolesLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <div style={{ maxWidth: '400px' }}> {/* Set a max width for the table container */}
              <Table striped bordered hover size="sm"> {/* Use a smaller size for the table */}
                <thead>
                  <tr>
                    <th>Roles</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id}>
                      <td>{role.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddEmployeeRole;