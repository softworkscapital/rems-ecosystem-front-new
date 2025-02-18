import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';
import { API_URL } from './config';

const CreateBranch = () => {
    const navigate = useNavigate();
    const [branchData, setBranchData] = useState({
        branch_id: "",
        branch_name: "",
        branch_location: "",
        branch_location_notes: "",
        branch_city: "",
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
            console.log('Response Data:', responseData);
    
            // Log the company ID and branch ID from the response
            console.log('Company ID:', finalBranchData.company_id);
            console.log('Branch ID:', responseData.branch_id);
    
            // Store company ID and branch ID in local storage
            await AsyncStorage.setItem('branch_id', responseData.branch_id);
            await AsyncStorage.setItem('branch_name', branchData.branch_name);
            console.log('Branch Name created:', branchData.branch_name);
    
            // Log company ID and branch ID from local storage
            const storedCompanyId = await AsyncStorage.getItem('company_id');
            const storedBranchId = await AsyncStorage.getItem('branch_id');
            console.log('Stored Company ID:', storedCompanyId);
            console.log('Stored Branch ID:', storedBranchId);
    
            Swal.fire({
                title: 'Success!',
                text: responseData.message || 'Branch setup completed successfully!',
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
            <TopBar />
            <div className="d-flex flex-grow-1">
                <SideBar />
                <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f1f1f1', overflowY: 'auto', maxHeight: 'calc(100vh - 56px)', marginLeft: '250px' }}>
                    <h2 className="mb-4" style={{ margin: '60px 0' }}>Branch Setup</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Branch Information */}
                        <div style={{ border: '2px solid #FFD700', borderRadius: '8px', backgroundColor: '#fff', marginBottom: '20px', padding: '20px' }}>
                            <h3 className="mb-4">Branch Information</h3>
                            {['branch_name', 'branch_location', 'branch_location_notes', 'branch_city', 'enrolled_by', 'phone', 'email'].map((field, index) => (
                                <div className="row mb-3" key={index}>
                                    <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                    <div className="col-sm-8">
                                        <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} className="form-control" value={branchData[field]} onChange={handleChange} required={field === 'branch_name' || field === 'branch_city'} />
                                    </div>
                                </div>
                            ))}
                            <div className="row mb-3">
                                <label htmlFor="company_name" className="col-sm-4 col-form-label text-start">Company Name</label>
                                <div className="col-sm-8">
                                    <input type="text" id="company_name" name="company_name" className="form-control" value={branchData.company_name} readOnly />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBranch;