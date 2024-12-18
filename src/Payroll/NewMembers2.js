import React, { useState } from 'react';
import { Tabs, Tab, Nav, Button } from 'react-bootstrap';
import SideBar from './component/SideBar';
// import TopNav from './component/TopNav';
// import Footer from './component/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employees = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        address: '',
        companyName: '',
        jobTitle: '',
        employmentStartDate: '',
        beneficiaryName: '',
        beneficiaryRelationship: '',
        beneficiaryContact: '',
        profilePicture: null,
        documents: [],
    });

    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleNextTab = () => {
        setCurrentTab(currentTab + 1);
    };

    const isFormValid = () => {
        // Implement your form validation logic here
        // Return true if the current tab's form fields are filled out correctly
        return true;
    };

    return (
        <div className="d-flex">
            <div style={{ width: '250px' }}>
                <SideBar />
            </div>
            <div className="flex-fill">
                
                <div className="container mt-4" style={{ maxWidth: '70%' }}>
                    <h2 className="mb-4" style={{ marginTop: 80 }}>Member Registration</h2>
                    <Tabs activeKey={currentTab} onSelect={(key) => setCurrentTab(Number(key))} className="mb-0 d-flex" style={{marginBottom: 70}}>
                        <Tab eventKey={0} title="Personal Details" className="flex-fill">
                            <div className="card mb-4 bg-white">
                                <div className="card-body">
                                    <h3>Personal Details</h3>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="fullName" placeholder="Full Name" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="date" className="form-control" name="dateOfBirth" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" name="email" placeholder="Email" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="tel" className="form-control" name="phone" placeholder="Phone Number" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className="form-control" name="address" placeholder="Address" required onChange={handleChange}></textarea>
                                    </div>
                                </div>
                            </div>
                            {currentTab < 3 && (
                                <Button className="mt-3 float-start" onClick={handleNextTab} disabled={!isFormValid()} style={{marginBottom: 70}}>
                                    Next
                                </Button>
                            )}
                        </Tab>
                        <Tab eventKey={1} title="Employment Details" className="flex-fill">
                            <div className="card mb-4 bg-white">
                                <div className="card-body">
                                    <h3>Employment Details</h3>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="companyName" placeholder="Company Name" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="jobTitle" placeholder="Job Title" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="date" className="form-control" name="employmentStartDate" required onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            {currentTab < 3 && (
                                <Button className="mt-3 float-start" onClick={handleNextTab} disabled={!isFormValid()}>
                                    Next
                                </Button>
                            )}
                        </Tab>
                        <Tab eventKey={2} title="Beneficiary Information" className="flex-fill">
                            <div className="card mb-4 bg-white">
                                <div className="card-body">
                                    <h3>Beneficiary Information</h3>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="beneficiaryName" placeholder="Name of Beneficiary" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="beneficiaryRelationship" placeholder="Relationship to Member" required onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="tel" className="form-control" name="beneficiaryContact" placeholder="Beneficiary Contact" required onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            {currentTab < 3 && (
                                <Button className="mt-3 float-start" onClick={handleNextTab} disabled={!isFormValid()}>
                                    Next
                                </Button>
                            )}
                        </Tab>
                        <Tab eventKey={3} title="Upload Documents" className="flex-fill">
                            <div className="card mb-4 bg-white">
                                <div className="card-body">
                                    <h3>Upload Documents</h3>
                                    <div className="mb-3">
                                        <input type="file" className="form-control" name="profilePicture" accept="image/*" onChange={handleFileChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="file" className="form-control" name="documents" accept=".pdf,.doc,.docx" multiple onChange={handleFileChange} />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="mt-3 float-start" onClick={handleSubmit}>
                                Register
                            </Button>
                        </Tab>
                        <Tab eventKey={4} title="Select Pension Plan" className="flex-fill bg-white">
                            <div className="card mb-4 bg-white">
                                <div className="card-body">
                                    <h3>Select Pension Plan</h3>
                                    <div className="mb-3">
                                        <select className="form-control" name="pensionPlan" onChange={handleChange}>
                                            <option value="">Select Pension Plan</option>
                                            <option value="plan1">Pension Plan 1</option>
                                            <option value="plan2">Pension Plan 2</option>
                                            <option value="plan3">Pension Plan 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="mt-3 float-start" onClick={handleSubmit}>
                                Register
                            </Button>
                        </Tab>
                    </Tabs>
                </div>
               
            </div>
        </div>
    );
};

export default Employees;