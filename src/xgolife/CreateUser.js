import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../xgolife/SideBar'; 
import TopBar from '../xgolife/TopBar';   
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    userid: null,
    company_id: "", // This will be set from Async Storage
    branch_id: "",   // This will be fetched based on branch_name
    username: "",
    password: "",
    email: "",
    role: "",
    branch: "",
    notify: false,
    status: ""
  });

  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyIdAndBranches = async () => {
      try {
        const companyId = await AsyncStorage.getItem('company_id');

        if (companyId) {
          setUserData(prevData => ({
            ...prevData,
            company_id: companyId
          }));

          // Fetch branches for the company using the company ID
          const branchResponse = await fetch(`${API_URL}/branches/branch_name/company/${companyId}`);
          if (branchResponse.ok) {
            const branchResponseData = await branchResponse.json();
            console.log('Fetched Branches:', branchResponseData); // Log the fetched branches
            setBranches(branchResponseData); // Populate the branches state with fetched data
          } else {
            console.error('Error fetching branches:', branchResponse.statusText);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to fetch branches.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Company ID not found.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error fetching data from Async Storage:', error);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    fetchCompanyIdAndBranches();
  }, []); // Runs once on mount

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Log the finalUserData to see its values before submission
    console.log('Final User Data:', userData);
    
    // Validate required fields
    if (!userData.username || !userData.password || !userData.email || !userData.branch) {
      Swal.fire({
        title: 'Error',
        text: 'Username, password, email, and branch are required.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const userResponse = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseText = await userResponse.text();
      if (!userResponse.ok) {
        throw new Error(responseText);
      }

      const responseData = JSON.parse(responseText);
      Swal.fire({
        title: 'Success!',
        text: responseData.message || 'User setup completed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <TopBar />
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '20px' }}>
        <div className="container py-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card shadow-lg"
            style={{ borderColor: '#FFC000' }}
          >
            <div className="card-header bg-white border-bottom" style={{ borderColor: '#FFC000' }}>
              <h3 className="mb-0 fw-bold text-start">Create New User</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-start" style={{ display: 'block' }}>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC000' }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-start" style={{ display: 'block' }}>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC000' }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-start" style={{ display: 'block' }}>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC000' }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-start" style={{ display: 'block' }}>Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC000' }}
                  >
                    <option value="">Select Role</option>
                    {['Admin', 'Manager', 'User'].map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-start" style={{ display: 'block' }}>Associated Branch</label>
                  <select
                    className="form-select"
                    name="branch"
                    value={userData.branch}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC000' }}
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex justify-content-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn text-dark"
                    style={{ backgroundColor: '#FFC000' }}
                  >
                    Create User
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;