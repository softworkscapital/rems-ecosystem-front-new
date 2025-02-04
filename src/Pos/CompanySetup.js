// src/CompanySetup.js
import React, { useState } from 'react';
import TopNav from './TopNav';
import SideBar from './SideBar';
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { API_URL, UPLOADS_API_URL } from './config';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';


const CompanySetup = () => {
    

const navigate = useNavigate();
    const [companyData, setCompanyData] = useState({
        company_setup_id: null,
        company_id: "",
        name: "",
        address: "",
        registration_number: "",
        industry: "",
        company_size: "",
        trading_name: "",
        phone_number1: "",
        phone_number2: "",
        email1: "",
        email2: "",
        mode_transaction_size: "",
        number_of_transactions_per_day: 0,
        website: "",
        bank_account_id1: "",
        bank_account_id2: "",
        bp_number: "",
        vat_number: "",
        base_currency: "USD",
        vat_tax_rate: 0,
        discount_rate: 0,
        physical_address: "",
        portrait_logo: null,
        horizontal_logo: null,
        sub_logo: null,
        footer: "",
        salutations: "",
        letterhead: null
    });

    const [openSections, setOpenSections] = useState({
        contact: false,
        businessInfo: false,
        billingInfo: false,
        vatInfo: false,
        assets: false
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setCompanyData({ ...companyData, [name]: files ? files[0] : value });
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const companyId = localStorage.getItem("async_client_profile_id");
        const branchId = localStorage.getItem("branch_id");
        const syncid = "abcd123";

        if (!companyData.name || !companyData.registration_number || !companyData.industry) {
            Swal.fire({
                title: 'Error',
                text: 'Company name, registration number, and industry are required.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setIsLoading(false);
            return;
        }

        try {
            const uploadedImagePaths = await uploadImages(companyId, branchId, syncid);
            const finalCompanyData = {
                ...companyData,
                company_id: companyData.company_setup_id, // Set company_id to company_setup_id
                portrait_logo: uploadedImagePaths[0] || null,
                horizontal_logo: uploadedImagePaths[1] || null,
                sub_logo: uploadedImagePaths[2] || null,
                interest_rate: null // Set interest_rate to null
            };

            console.log('Company Data being sent:', finalCompanyData);

            const companyResponse = await fetch(`${API_URL}/companysetup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalCompanyData),
            });

            const responseText = await companyResponse.text(); // Get response as text
            console.log('Response Text:', responseText); // Log the raw response

            if (!companyResponse.ok) {
                throw new Error(responseText); // Use raw response for error
            }

            const responseData = JSON.parse(responseText); // Parse it as JSON after checking

            // Step 3: Store company_id and name in Async Storage
            await AsyncStorage.setItem('company_id', responseData.company_id);
            await AsyncStorage.setItem('company_name', finalCompanyData.name);

            // Console log the created company_id and name
            console.log('Company ID created:', responseData.company_id);
            console.log('Company Name created:', finalCompanyData.name);

            Swal.fire({
                title: 'Success!',
                text: responseData.message || 'Company setup completed successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Navigate to BranchSetup page
                navigate('/BranchSetup');
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

    const uploadImages = async (companyId, branchId, syncid) => {
        const fileInputs = [
            { name: 'portrait_logo', label: 'Portrait Logo' },
            { name: 'horizontal_logo', label: 'Horizontal Logo' },
            { name: 'sub_logo', label: 'Sub Logo' },
            { name: 'letterhead', label: 'Letterhead' }
        ];

        const imageUploadPromises = fileInputs.map(async (fileInput) => {
            const file = companyData[fileInput.name];
            if (file) {
                const formData = new FormData();
                formData.append('company_id', companyId);
                formData.append('branch_id', branchId);
                formData.append('syncid', syncid);
                formData.append('image', file);

                const response = await fetch(`${UPLOADS_API_URL}/uploads`, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to upload ${fileInput.label}: ${errorData.message || response.statusText}`);
                }

                const responseData = await response.json();
                return responseData.path; // Adjust according to your response structure
            }
            return null;
        });

        return Promise.all(imageUploadPromises);
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#fff' }}>
            <TopNav />
            <div className="d-flex flex-grow-1">
                <SideBar />
                <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f1f1f1', overflowY: 'auto', maxHeight: 'calc(100vh - 56px)' }}>
                    <h2 className="mb-4" style={{ margin: '60px 0' }}>Company Setup</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Business Information */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('businessInfo')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">Business Information</h3>
                                {openSections.businessInfo ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.businessInfo && (
                                <div className="card-body">
                                    {['name', 'address', 'registration_number', 'industry', 'company_size', 'trading_name', 'website'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                <input type={field === 'website' ? 'url' : 'text'} id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} required={field === 'name' || field === 'registration_number' || field === 'industry'} />
                                            </div>
                                        </div>
                                    ))}
                                    {/* Number of Transactions per Day */}
                                    <div className="row mb-3">
                                        <label htmlFor="number_of_transactions_per_day" className="col-sm-4 col-form-label text-start">Number of Transactions per Day</label>
                                        <div className="col-sm-8">
                                            <input type="number" id="number_of_transactions_per_day" name="number_of_transactions_per_day" className="form-control" value={companyData.number_of_transactions_per_day} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {/* Mode Transaction Size */}
                                    <div className="row mb-3">
                                        <label htmlFor="mode_transaction_size" className="col-sm-4 col-form-label text-start">Mode Transaction Size</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="mode_transaction_size" name="mode_transaction_size" className="form-control" value={companyData.mode_transaction_size} onChange={handleChange} />
                                        </div>
                                    </div>
                                    {/* Base Currency Dropdown */}
                                    <div className="row mb-3">
                                        <label htmlFor="base_currency" className="col-sm-4 col-form-label text-start">Base Currency</label>
                                        <div className="col-sm-8">
                                            <select id="base_currency" name="base_currency" className="form-select" value={companyData.base_currency} onChange={handleChange}>
                                                <option value="USD">USD</option>
                                                <option value="ZIG">ZIG</option>
                                                <option value="ZAR">ZAR</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('contact')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">Contact Information</h3>
                                {openSections.contact ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.contact && (
                                <div className="card-body">
                                    {['phone_number1', 'phone_number2', 'email1', 'email2'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                <input type={field.includes('email') ? 'email' : 'tel'} id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} required={field === 'email1'} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Billing Information */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('billingInfo')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">Billing Information</h3>
                                {openSections.billingInfo ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.billingInfo && (
                                <div className="card-body">
                                    {['bank_account_id1', 'bank_account_id2', 'bp_number', 'vat_number'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                <input type="text" id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* VAT Information */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('vatInfo')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">VAT Information</h3>
                                {openSections.vatInfo ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.vatInfo && (
                                <div className="card-body">
                                    {['vat_number'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                <input type="text" id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Assets */}
                        <div className="card mb-3" style={{ maxWidth: '60%', margin: '0 auto' }}>
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleSection('assets')} style={{ cursor: 'pointer', fontSize: '1.25rem' }}>
                                <h3 className="mb-0">Assets</h3>
                                {openSections.assets ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {openSections.assets && (
                                <div className="card-body">
                                    {['portrait_logo', 'horizontal_logo', 'sub_logo', 'letterhead', 'footer', 'salutations'].map((field, index) => (
                                        <div className="row mb-3" key={index}>
                                            <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                            <div className="col-sm-8">
                                                {field.includes('logo') || field === 'letterhead' ? (
                                                    <input type="file" id={field} name={field} className="form-control" onChange={handleChange} />
                                                ) : (
                                                    <input type="text" id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} />
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

export default CompanySetup;