// src/BranchSetup.js
import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';
import SideBar from './SideBar';
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { API_URL } from './config';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';




const BranchSetup = () => {
    const navigate = useNavigate();
    const [branchData, setBranchData] = useState({
        branch_id: "",
        branch_name: "",
        branch_location: "",
        branch_location_notes: "",
        branch_city: "",
        latitude: "",
        longitude: "",
        company_id: "", // This will be set from Async Storage
        company_name: "", // This will be fetched based on company_id
        enrolled_on: new Date().toISOString().split('T')[0], // Default to today
        enrolled_by: "",
        phone: "",
        email: "",
        sync_interval: "",
        branch_reorder_level_kgs: "",
        auto_branch_reorder_status: false,
        inventory_level: "",
        inventory_storage_capacity: "",
        rems_subscription_id: "",
        transactions_volume_limit_kgs: "",
        expiry_date: ""
    });

    const [openSections, setOpenSections] = useState({
        branchInfo: false,
        contactInfo: false,
        inventoryInfo: false
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const companyId = await AsyncStorage.getItem('company_id');
                const companyName = await AsyncStorage.getItem('company_name');

                if (companyId) {
                    setBranchData(prevData => ({
                        ...prevData,
                        company_id: companyId,
                        company_name: companyName // Set company name from Async Storage
                    }));
                }
            } catch (error) {
                console.error('Error fetching company details from Async Storage:', error);
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchCompanyDetails();
    }, []); // Empty dependency array means this runs once on mount

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setBranchData({ ...branchData, [name]: type === 'checkbox' ? checked : value });
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const finalBranchData = {
            ...branchData,
            company_id: branchData.company_id,
            company_name: branchData.company_name
        };
    
        if (!branchData.branch_name || !branchData.branch_location || !branchData.branch_city) {
            Swal.fire({
                title: 'Error',
                text: 'Branch name, location, and city are required.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setIsLoading(false);
            return;
        }
    
        console.log('Data being sent to the database:', finalBranchData);
    
        try {
            const branchResponse = await fetch(`${API_URL}/branches`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalBranchData),
            });
    
            const responseText = await branchResponse.text();
            if (!branchResponse.ok) {
                throw new Error(responseText);
            }
    
            const responseData = JSON.parse(responseText);
            
            // Log the entire responseData to check its structure
            console.log('Response Data:', responseData);
    
            // Store the branch name in Async Storage
            const createdBranchName = responseData.branch_name || branchData.branch_name; // Use the correct property name
            await AsyncStorage.setItem('branch_name', createdBranchName); // Store the branch name in Async Storage
            console.log('Branch Name created:', createdBranchName); // Log the branch name
    
            Swal.fire({
                title: 'Success!',
                text: responseData.message || 'Branch setup completed successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Navigate to BranchSetup page
                navigate('/UserSetup');
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
                    <h2 className="mb-4" style={{ margin: '60px 0' }}>Branch Setup</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Branch Information */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('branchInfo')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">Branch Information</h3>
                                {openSections.branchInfo ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.branchInfo && (
                                <div className="card-body">
                                    {['branch_name', 'branch_location', 'branch_location_notes', 'branch_city', 'latitude', 'longitude', 'company_name', 'enrolled_by', 'phone', 'email'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} className="form-control" value={branchData[field]} onChange={handleChange} required={field === 'branch_name' || field === 'branch_city'} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Inventory Information */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('inventoryInfo')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">Inventory Information</h3>
                                {openSections.inventoryInfo ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.inventoryInfo && (
                                <div className="card-body">
                                    {['sync_interval', 'branch_reorder_level_kgs', 'auto_branch_reorder_status', 'inventory_level', 'inventory_storage_capacity', 'rems_subscription_id', 'transactions_volume_limit_kgs', 'expiry_date'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                {field === 'auto_branch_reorder_status' ? (
                                                    <input type="checkbox" id={field} name={field} className="form-check-input" checked={branchData[field]} onChange={handleChange} />
                                                ) : (
                                                    <input type={field === 'expiry_date' ? 'date' : 'text'} id={field} name={field} className="form-control" value={branchData[field]} onChange={handleChange} />
                                                )}
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

export default BranchSetup;