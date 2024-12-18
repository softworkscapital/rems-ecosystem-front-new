import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { PENSION_API_URL } from './component/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalInformation from './component/PersonalInformation';
import BeneficiaryInformation from './component/BeneficiaryInformation';
import PensionPlanSelection from './component/PensionPlanSelection';

const NewMembers = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        surname: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        address: '',
        nextOfKinName: '',
        nextOfKinSurname: '',
        nextOfKinEmail: '',
        nextOfKinPhone: '',
        companyName: '',
        jobTitle: '',
        employmentStartDate: '',
        beneficiaries: [],
        documents: {},
        pensionPlans: [],
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [pensionPlans, setPensionPlans] = useState([]);

    useEffect(() => {
        const fetchPensionPlans = async () => {
            try {
                const response = await fetch(`${PENSION_API_URL}/pension_products`);
                const data = await response.json();
                setPensionPlans(data);
            } catch (error) {
                console.error('Error fetching pension plans:', error);
            }
        };
        fetchPensionPlans();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e, docName) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            documents: { ...prevData.documents, [docName]: file }
        }));
    };

    const addBeneficiary = (beneficiary) => {
        setFormData((prevData) => ({
            ...prevData,
            beneficiaries: [...prevData.beneficiaries, beneficiary]
        }));
    };

    const handleSubmitSuccess = () => {
        setCurrentStep(1); // Move to Beneficiary Information step
    };

    const handleBeneficiaryNext = () => {
        setCurrentStep(2); // Move to Pension Plan Selection step
    };

    const steps = [
        { content: (
            <PersonalInformation
                formData={formData}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                onSubmitSuccess={handleSubmitSuccess}
            />
        )},
        { content: (
            <BeneficiaryInformation
                formData={formData}
                handleChange={handleChange}
                addBeneficiary={addBeneficiary}
                onNext={handleBeneficiaryNext}
            />
        )},
        { content: (
            <PensionPlanSelection
                pensionPlans={pensionPlans}
                formData={formData}
            />
        )}
    ];

    return (
        <div className="d-flex">
            <div style={{ width: '250px' }}>
                <SideBar />
            </div>
            <div className="flex-fill">
                <TopNav />
                <div className="container mt-4" style={{ maxWidth: '90%' }}>
                    <h3 className="mb-4" style={{ marginTop: 80 }}>Member Registration</h3>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        {steps.map((step, index) => (
                            <div key={index} className="d-flex align-items-center">
                                <div className={`rounded-circle d-flex justify-content-center align-items-center border ${currentStep === index ? 'bg-success text-white' : 'bg-light'}`} style={{ width: '40px', height: '40px' }}>
                                    {index + 1}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`step-line ${currentStep > index ? 'bg-success' : 'bg-light'}`} style={{ height: '2px', width: '500px', marginLeft: '10px' }}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="card mb-5 bg-white" style={{ marginBottom: '120px' }}>
                        <div className="card-body">
                            <h4>{currentStep === 0 ? 'Personal Information' : currentStep === 1 ? 'Beneficiary Information' : 'Pension Plan Selection'}</h4>
                            {steps[currentStep].content}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default NewMembers;