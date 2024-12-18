import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { PENSION_API_URL, UPLOADS_API_URL } from './config';

const BeneficiaryInformation = ({ formData, handleChange, addBeneficiary, onNext }) => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const membershipId = 'AAA-100005';

    const handleAddBeneficiary = () => {
        const newBeneficiary = {
            name: formData.beneficiaryName,
            surname: formData.beneficiarySurname,
            dob: formData.beneficiaryDOB,
            idNumber: formData.beneficiaryIdNumber,
            email: formData.beneficiaryEmail,
            phone: formData.beneficiaryPhone,
            picture: formData.beneficiaryPicture,
        };

        setBeneficiaries(prev => [...prev, newBeneficiary]);
        addBeneficiary(newBeneficiary); // Add to global state

        // Clear input fields
        handleChange({ target: { name: 'beneficiaryName', value: '' } });
        handleChange({ target: { name: 'beneficiarySurname', value: '' } });
        handleChange({ target: { name: 'beneficiaryDOB', value: '' } });
        handleChange({ target: { name: 'beneficiaryIdNumber', value: '' } });
        handleChange({ target: { name: 'beneficiaryEmail', value: '' } });
        handleChange({ target: { name: 'beneficiaryPhone', value: '' } });
        handleChange({ target: { name: 'beneficiaryPicture', value: '' } });
    };

    const handleNext = async () => {
        setIsLoading(true);
        let allSuccess = true;

        for (const beneficiary of beneficiaries) {
            try {
                const formDataToUpload = new FormData();
                formDataToUpload.append('image', beneficiary.picture);

                const uploadResponse = await fetch(`${UPLOADS_API_URL}/uploads`, {
                    method: 'POST',
                    body: formDataToUpload,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload picture');
                }

                const uploadData = await uploadResponse.json();

                const beneficiaryData = {
                    primary_member_id: membershipId,
                    name: beneficiary.name,
                    surname: beneficiary.surname,
                    dob: beneficiary.dob,
                    idNumber: beneficiary.idNumber,
                    email: beneficiary.email,
                    phone: beneficiary.phone,
                    picturePath: uploadData.path,
                };

                const beneficiaryResponse = await fetch(`${PENSION_API_URL}/beneficiaries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(beneficiaryData),
                });

                if (!beneficiaryResponse.ok) {
                    throw new Error('Failed to create beneficiary');
                }

                Swal.fire({
                    title: 'Success',
                    text: 'Beneficiary added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

            } catch (error) {
                console.error(error);
                allSuccess = false;
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                break; // Exit the loop on error
            }
        }

        setIsLoading(false);

        if (allSuccess) {
            onNext(); // Call the onNext function passed from the parent component
        }
    };

    return (
        <div className="text-left">
            <h3>Add New Beneficiary</h3>
            <input 
                type="text" 
                className="form-control mb-2" 
                name="beneficiaryName" 
                placeholder="Beneficiary Name" 
                value={formData.beneficiaryName} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                className="form-control mb-2" 
                name="beneficiarySurname" 
                placeholder="Beneficiary Surname" 
                value={formData.beneficiarySurname} 
                onChange={handleChange} 
            />
            <input 
                type="date" 
                className="form-control mb-2" 
                name="beneficiaryDOB" 
                value={formData.beneficiaryDOB} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                className="form-control mb-2" 
                name="beneficiaryIdNumber" 
                placeholder="Beneficiary ID Number" 
                value={formData.beneficiaryIdNumber} 
                onChange={handleChange} 
            />
            <input 
                type="email" 
                className="form-control mb-2" 
                name="beneficiaryEmail" 
                placeholder="Beneficiary Email" 
                value={formData.beneficiaryEmail} 
                onChange={handleChange} 
            />
            <input 
                type="tel" 
                className="form-control mb-2" 
                name="beneficiaryPhone" 
                placeholder="Beneficiary Phone" 
                value={formData.beneficiaryPhone} 
                onChange={handleChange} 
            />
            <input 
                type="file" 
                className="form-control mb-2" 
                name="beneficiaryPicture" 
                accept="image/*" 
                onChange={(e) => handleChange({ target: { name: 'beneficiaryPicture', value: e.target.files[0] } })} 
            />

            <Button onClick={handleAddBeneficiary} variant="primary">Add Beneficiary</Button>
            <Button onClick={handleNext} variant="success" className="mt-3" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Next'}
            </Button>

            {beneficiaries.length > 0 && (
                <div className="mt-4">
                    <h3>Added Beneficiaries</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Date of Birth</th>
                                <th>ID Number</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beneficiaries.map((beneficiary, index) => (
                                <tr key={index}>
                                    <td>{beneficiary.name}</td>
                                    <td>{beneficiary.surname}</td>
                                    <td>{beneficiary.dob}</td>
                                    <td>{beneficiary.idNumber}</td>
                                    <td>{beneficiary.email}</td>
                                    <td>{beneficiary.phone}</td>
                                    <td>
                                        {beneficiary.picture && (
                                            <img 
                                                src={URL.createObjectURL(beneficiary.picture)} 
                                                alt="Beneficiary" 
                                                style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BeneficiaryInformation;