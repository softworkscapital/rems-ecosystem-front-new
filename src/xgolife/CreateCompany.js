import React, { useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL, UPLOADS_API_URL } from './config';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from 'react-bootstrap';

const CreateCompany = () => {
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
        bank_account_id1: "",
        bank_account_id2: "",
        bp_number: "",
        vat_number: "",
        base_currency: "USD",
        vat_tax_rate: 0,
        discount_rate: 0,
        physical_address: "",
        portrait_logo: null,
        salutation: "",
        letterhead: null
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setCompanyData({ ...companyData, [name]: files ? files[0] : value });
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
                portrait_logo: uploadedImagePaths[0] || null,
                interest_rate: null
            };

            const companyResponse = await fetch(`${API_URL}/companysetup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalCompanyData),
            });

            const responseText = await companyResponse.text();

            if (!companyResponse.ok) {
                throw new Error(responseText);
            }

            const responseData = JSON.parse(responseText);

            // Store the newly created company ID in local storage
            await AsyncStorage.setItem('company_id', responseData.company_id);
            await AsyncStorage.setItem('company_name', finalCompanyData.name);

            // Log the new company ID
            console.log('New Company ID:', responseData.company_id);

            Swal.fire({
                title: 'Success!',
                text: responseData.message || 'Company setup completed successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // No navigation occurs after submission

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
            { name: 'portrait_logo', label: 'Logo' },
            { name: 'letterhead', label: 'Letterhead' }
        ];

        const imageUploadPromises = fileInputs.map(async (fileInput) => {
            const file = companyData[fileInput.name];
            if (file) {
                const formDataToUpload = new FormData();
                formDataToUpload.append('company_id', companyId);
                formDataToUpload.append('branch_id', branchId);
                formDataToUpload.append('syncid', syncid);
                formDataToUpload.append('image', file);

                try {
                    const response = await fetch(`${UPLOADS_API_URL}/uploads`, {
                        method: "POST",
                        body: formDataToUpload,
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Failed to upload ${fileInput.label}: ${errorData.message || response.statusText}`);
                    }

                    const responseData = await response.json();
                    return responseData.path;
                } catch (error) {
                    console.error('Upload error:', error);
                    throw new Error(`Error uploading ${fileInput.label}: ${error.message}`);
                }
            }
            return null; // No file to upload
        });

        return Promise.all(imageUploadPromises);
    };

    return (
        <Container fluid style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '250px' }}>
                    <SideBar />
                </div>
                <div style={{ flex: 1 }}>
                    <TopBar style={{ margin: '0' }} />
                    <div className="p-4" style={{ backgroundColor: '#f1f1f1' }}>
                        <h2 className="mb-4" style={{ color: '#FFD700' }}>Company Setup</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Business Information Card */}
                            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                                <h3 className="mb-4">Business Information</h3>
                                {['name', 'address', 'registration_number', 'industry', 'company_size', 'trading_name'].map((field, index) => (
                                    <div className="row mb-3" key={index}>
                                        <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                        <div className="col-sm-8">
                                            <input type="text" id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} required={field === 'name' || field === 'registration_number' || field === 'industry'} />
                                        </div>
                                    </div>
                                ))}
                                <div className="row mb-3">
                                    <label htmlFor="number_of_transactions_per_day" className="col-sm-4 col-form-label text-start">Number of Transactions per Day</label>
                                    <div className="col-sm-8">
                                        <input type="number" id="number_of_transactions_per_day" name="number_of_transactions_per_day" className="form-control" value={companyData.number_of_transactions_per_day} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="mode_transaction_size" className="col-sm-4 col-form-label text-start">Mode Transaction Size</label>
                                    <div className="col-sm-8">
                                        <input type="text" id="mode_transaction_size" name="mode_transaction_size" className="form-control" value={companyData.mode_transaction_size} onChange={handleChange} />
                                    </div>
                                </div>
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

                            {/* Contact Information Card */}
                            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                                <h3 className="mb-4">Contact Information</h3>
                                {['phone_number1', 'phone_number2', 'email1', 'email2'].map((field, index) => (
                                    <div className="row mb-3" key={index}>
                                        <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                        <div className="col-sm-8">
                                            <input type={field.includes('email') ? 'email' : 'tel'} id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} required={field === 'email1'} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* VAT Information Card */}
                            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                                <h3 className="mb-4">VAT Information</h3>
                                {['vat_number'].map((field, index) => (
                                    <div className="row mb-3" key={index}>
                                        <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                        <div className="col-sm-8">
                                            <input type="text" id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Assets Card */}
                            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
                                <h3 className="mb-4">Assets</h3>
                                {['portrait_logo', 'salutation'].map((field, index) => (
                                    <div className="row mb-3" key={index}>
                                        <label htmlFor={field} className="col-sm-4 col-form-label text-start">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                                        <div className="col-sm-8">
                                            {field === 'portrait_logo' ? (
                                                <input type="file" id={field} name={field} className="form-control" onChange={handleChange} />
                                            ) : (
                                                <input type="text" id={field} name={field} className="form-control" value={companyData[field]} onChange={handleChange} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ backgroundColor: '#FFD700', borderColor: '#FFD700' }}>
                                {isLoading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default CreateCompany;