// src/UserSetup.js
import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';
import SideBar from './SideBar';
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { API_URL } from './config';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSetup = () => {
    const [userData, setUserData] = useState({
        userid: null,
        company_id: "", // This will be set from Async Storage
        branch_id: "",   // This will be fetched based on branch_name
        username: "",
        password: "",
        role: "",
        category: "",
        email: "",
        notify: false,
        activesession: false,
        addproperty: false,
        editproperty: false,
        approverequests: false,
        delivery: false,
        status: "",
        client_profile_id: "",
        OTP: ""
    });

    const [openSections, setOpenSections] = useState({
        userInfo: false,
        permissions: false
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCompanyIdAndBranchId = async () => {
            try {
                const companyId = await AsyncStorage.getItem('company_id');
                const branchName = await AsyncStorage.getItem('branch_name');

                if (companyId) {
                    setUserData(prevData => ({
                        ...prevData,
                        company_id: companyId
                    }));
                }
                console.log("cmpany", companyId);

                if (branchName) {
                    // Fetch the branch_id using the branch_name
                    const branchResponse = await fetch(`${API_URL}/branches/branch_id/${branchName}`);
                    const branchResponseData = await branchResponse.json();
                    console.log("gggg",branchResponseData );

                    if (branchResponse.ok) {
                        const fetchedBranchId = branchResponseData[0].branch_id; // Adjust based on your API response
                        setUserData(prevData => ({
                            ...prevData,
                            branch_id: fetchedBranchId
                        }));
                    } else {
                        console.error('Error fetching branch ID:', branchResponseData.message);
                    }
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

        fetchCompanyIdAndBranchId();
    }, []); // Empty dependency array means this runs once on mount

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value });
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const finalUserData = {
            ...userData,
            company_id: userData.company_id, // Ensure company_id is set
            branch_id: userData.branch_id // Use the correct branch_id
        };
    
        // Log the finalUserData to see its values before submission
        console.log('Final User Data:', finalUserData);
    
        // Validate required fields
        if (!userData.username || !userData.password || !userData.email) {
            Swal.fire({
                title: 'Error',
                text: 'Username, password, and email are required.',
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
                body: JSON.stringify(finalUserData),
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
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#fff' }}>
            <TopNav />
            <div className="d-flex flex-grow-1">
                <SideBar />
                <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f1f1f1', overflowY: 'auto', maxHeight: 'calc(100vh - 56px)' }}>
                    <h2 className="mb-4" style={{ margin: '60px 0' }}>User Setup</h2>
                    <form onSubmit={handleSubmit}>
                        {/* User Information */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('userInfo')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">User Information</h3>
                                {openSections.userInfo ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.userInfo && (
                                <div className="card-body">
                                    {['username', 'password', 'email', 'status', 'client_profile_id', 'OTP'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                <input type={field === 'password' ? 'password' : 'text'} id={field} name={field} className="form-control" value={userData[field]} onChange={handleChange} required={field === 'username' || field === 'password' || field === 'email'} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Permissions */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('permissions')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">Permissions</h3>
                                {openSections.permissions ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.permissions && (
                                <div className="card-body">
                                    {['notify', 'activesession', 'addproperty', 'editproperty', 'approverequests', 'delivery'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                <input type="checkbox" id={field} name={field} className="form-check-input" checked={userData[field]} onChange={handleChange} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserSetup;