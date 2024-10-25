import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import Swal from "sweetalert2"; 
import { API_URL } from '../config'; 

const Views = () => {
  const navigate = useNavigate();

  const [companyId, setCompanyId] = useState(''); // Initialize to empty string

  // Load the current company ID from local storage
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("company_id");
    setCompanyId(storedCompanyId || ''); // Set to stored ID or empty
  }, []);

  // Function to handle company ID change
  const handleCompanyChange = (event) => {
    setCompanyId(event.target.value);
  };

// Function to handle the Go button click
const handleGoClick = () => {
    if (companyId) {
      localStorage.setItem("company_id", companyId); // Update company ID in local storage
      Swal.fire({
        title: 'Success!',
        text: `Company ID has been updated to ${companyId}`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/ControlPanel'); // Redirect to ControlPanel
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a Company ID.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ padding: 10, flex: 1, marginTop: 20, marginBottom: 20, marginTop: 80 }}>
          <h4>View Company Details</h4>
          <Form style={{ display: 'flex', alignItems: 'center', marginLeft: 400 }}> 
            <Form.Group controlId="companySelect" style={{ marginRight: '10px', width: '500px' }}> {/* Set a reasonable width for the dropdown */}
              <Form.Label>Select Company ID</Form.Label>
              <Form.Select 
                value={companyId} 
                onChange={handleCompanyChange}
              >
                <option value="">Select a Company ID</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Company ID {index + 1}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button 
              variant="primary" 
              onClick={handleGoClick}
              style={{ marginTop: 30}}
            >
              Go
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Views;