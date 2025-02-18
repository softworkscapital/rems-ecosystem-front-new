import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../xgolife/SideBar'; 
import TopBar from '../xgolife/TopBar';  
import { API_URL } from "./config";
import Swal from "sweetalert2"; // Ensure SweetAlert is imported
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const XGoSwitchView = () => {
  const navigate = useNavigate();
  const [companyNames, setCompanyNames] = useState([]);
  const [branchNames, setBranchNames] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(''); // Declare state for selected company ID
  const [selectedBranchId, setSelectedBranchId] = useState(''); // Declare state for selected branch ID
  const [selectedCompanyName, setSelectedCompanyName] = useState(''); // Declare state for selected company name
  const [selectedBranchName, setSelectedBranchName] = useState(''); // Declare state for selected branch name

  useEffect(() => {
    fetchCompanyNames();
  }, []);

  const fetchCompanyNames = async () => {
    try {
      const response = await fetch(`${API_URL}/companysetup/`);
      const data = await response.json();
      console.log("Fetched Company Names:", data);
      setCompanyNames(data);
    } catch (error) {
      console.error("Error fetching company names:", error);
    }
  };

  const fetchBranches = async (companyId) => {
    try {
      const response = await fetch(`${API_URL}/branches/branch_name/company/${companyId}`);
      const data = await response.json();
      console.log("Fetched Branch Names:", data);
      setBranchNames(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleCompanyChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCompanyId(selectedId);
    
    const selectedCompany = companyNames.find(company => company.company_id === selectedId);
    if (selectedCompany) {
      setSelectedCompanyName(selectedCompany.name);
      localStorage.setItem('selectedCompanyId', selectedId);
      localStorage.setItem('selectedCompanyName', selectedCompany.name);
      console.log("Company Selected:", selectedCompany.name);
    } else {
      setSelectedCompanyName('');
    }
    
    if (selectedId) {
      fetchBranches(selectedId);
    } else {
      setBranchNames([]);
    }
  };

  const handleBranchChange = (event) => {
    const selectedId = event.target.value;
    setSelectedBranchId(selectedId);
    
    const selectedBranch = branchNames.find(branch => branch.branch_id === selectedId);
    if (selectedBranch) {
      setSelectedBranchName(selectedBranch.branch_name);
      console.log("Branch Selected:", selectedBranch.branch_name);
    } else {
      setSelectedBranchName('');
    }
  };

  const handleGoClick = async () => {
    console.log("Before Navigation:");
    console.log("Selected Company ID:", selectedCompanyId);
    console.log("Selected Branch ID:", selectedBranchId);

    if (selectedCompanyId && selectedBranchId) {
      try {
   
        localStorage.setItem('selectedCompanyId', selectedCompanyId);
        localStorage.setItem('selectedBranchId', selectedBranchId);

        console.log("Storing in local storage:");
        console.log("Company ID:", selectedCompanyId);
        console.log("Branch ID:", selectedBranchId);

        Swal.fire({
          title: 'Success!',
          text: `Company ID ${selectedCompanyId} and Branch ID ${selectedBranchId} updated in local storage.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Clear form fields after success
          setSelectedCompanyId('');
          setSelectedBranchId('');
          setSelectedCompanyName('');
          setSelectedBranchName('');
          setBranchNames([]); // Clear branches
        });
      } catch (error) {
        console.error("Error storing in local storage:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to store selected company and branch details.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a Company ID and a Branch.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'lightgrey', minHeight: '100vh' }}>
      <TopBar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ padding: 10, flex: 1, marginTop: 20, marginBottom: 20, marginTop: 80 }}>
          <h4>Select Company Details</h4>
          <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 400 }}>
            <Form.Group controlId="companySelect" style={{ marginBottom: '20px', width: '500px', marginLeft: "-400px" }}>
              <Form.Label>Select Company Name</Form.Label>
              <Form.Select 
                value={selectedCompanyId} 
                onChange={handleCompanyChange}
              >
                <option value="">Select Company Name</option>
                {companyNames.map(company => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            {selectedCompanyId && (
              <Form.Group controlId="branchSelect" style={{ marginBottom: '20px', width: '500px', marginLeft: "-400px" }}>
                <Form.Label>Select Branch Name</Form.Label>
                <Form.Select 
                  value={selectedBranchId} 
                  onChange={handleBranchChange}
                >
                  <option value="">Select a Branch</option>
                  {branchNames.map(branch => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Button 
              variant="primary" 
              onClick={handleGoClick}
              style={{ marginTop: "30px", marginLeft: "200px", marginTop: "-60px" }}
            >
              Go
            </Button>
          </Form>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {selectedCompanyName && <p><strong>Selected Company:</strong> {selectedCompanyName}</p>}
            {selectedBranchName && <p><strong>Selected Branch:</strong> {selectedBranchName}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default XGoSwitchView;