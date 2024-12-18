import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { API_URL, UPLOADS_API_URL, PENSION_API_URL } from './config';

const PersonalInformation = ({ formData, handleChange, handleFileChange, onSubmitSuccess }) => {
    const [nextOfKin, setNextOfKin] = useState([]);

    const handleAddNextOfKin = () => {
        if (nextOfKin.length < 2) {
            const newKin = {
                name: formData.nextOfKinName,
                surname: formData.nextOfKinSurname,
                email: formData.nextOfKinEmail,
                phone: formData.nextOfKinPhone,
            };
            setNextOfKin([...nextOfKin, newKin]);
            // Clear input fields
            handleChange({ target: { name: 'nextOfKinName', value: '' } });
            handleChange({ target: { name: 'nextOfKinSurname', value: '' } });
            handleChange({ target: { name: 'nextOfKinEmail', value: '' } });
            handleChange({ target: { name: 'nextOfKinPhone', value: '' } });
        } else {
            Swal.fire({
                title: 'Limit Reached',
                text: 'You can only add up to 2 next of kin.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleSubmit = async () => {
        const companyId = localStorage.getItem("async_client_profile_id");
        const branchId = localStorage.getItem("branch_id");
        const syncid = "abcd123"; // Adjust this as needed

        // Validate required fields
        if (!formData.fullName || !formData.surname || !formData.email) {
            Swal.fire({
                title: 'Error',
                text: 'Username, email, name, and surname are required.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return; // Exit if validation fails
        }

        const username = formData.fullName; // Set username to full name

        // Prepare FormData for image uploads
        const fileInputs = [
            { name: 'profilePic', label: 'Profile Picture' },
            { name: 'confirmation_from_employer_pic', label: 'Confirmation from Employer' },
            { name: 'identity_document_pic', label: 'Identity Document' },
            { name: 'address_proof_pic', label: 'Address Proof' },
            { name: 'application_form_pic', label: 'Signed application form' }
        ];

        const imageUploadPromises = fileInputs.map(async (fileInput) => {
            const file = formData.documents[fileInput.label];
            if (file) {
                const formDataToUpload = new FormData();
                formDataToUpload.append('company_id', companyId);
                formDataToUpload.append('branch_id', branchId);
                formDataToUpload.append('syncid', syncid);
                formDataToUpload.append('image', file);

                const response = await fetch(`${UPLOADS_API_URL}/uploads`, {
                    method: "POST",
                    body: formDataToUpload,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const responseData = await response.json();
                return responseData.path; // Adjust according to your response structure
            }
            return null; // No file to upload
        });

        try {
            const uploadedImagePaths = await Promise.all(imageUploadPromises);
            const validImagePaths = uploadedImagePaths.filter(path => path !== null);

            const memberData = {
                membership_id: 'AAA-100005',
                company_id: companyId,
                company_name: formData.companyName,
                contributed_principal_balance: 0,
                ecnumber: '',
                account_type: '',
                account_category: '',
                signed_on: new Date().toISOString(),
                name: formData.fullName,
                surname: formData.surname,
                idnumber: '',
                sex: '',
                dob: formData.dateOfBirth || '',
                address: formData.address,
                house_number_and_street_name: formData.address,
                suburb: '',
                city: '',
                country: '',
                lat_cordinates: '',
                long_cordinates: '',
                phone: formData.phone,
                username: username, // Set username here
                email: formData.email,
                password: '',
                employer: formData.companyName,
                workindustry: '',
                workaddress: '',
                workphone: '',
                workphone2: '',
                nok1name: nextOfKin[0]?.name || null,
                nok1surname: nextOfKin[0]?.surname || null,
                nok1relationship: '',
                nok1_id_number: '',
                nok1_email: nextOfKin[0]?.email || null,
                nok1phone: nextOfKin[0]?.phone || null,
                nok2name: nextOfKin[1]?.name || null,
                nok2surname: nextOfKin[1]?.surname || null,
                nok2relationship: '',
                nok2_id_number: '',
                nok2_email: nextOfKin[1]?.email || null,
                nok2phone: nextOfKin[1]?.phone || null,
                creditstanding: '',
                credit_bar_rule_exception: '',
                membershipstatus: '',
                defaultsubs: '',
                sendmail: true,
                sendsms: true,
                product_code: '',
                cost_price: 0,
                selling_price: 0,
                payment_style: '',
                bp_number: '',
                vat_number: '',
                profilePic: validImagePaths[0] || null,
                confirmation_from_employer_pic: validImagePaths[1] || null,
                identity_document_pic: validImagePaths[2] || null,
                address_proof_pic: validImagePaths[3] || null,
                application_form_pic: validImagePaths[4] || null,
            };

            // Log the memberData object
            console.log('Member Data being sent:', memberData);

            const createMemberResponse = await fetch(`${PENSION_API_URL}/members`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(memberData),
            });

            if (createMemberResponse.ok) {
                Swal.fire({
                    title: 'Success',
                    text: 'Member created successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                onSubmitSuccess(); 
            } else {
                const errorData = await createMemberResponse.json();
                throw new Error(errorData.message || 'Failed to create member');
            }
        } catch (err) {
            console.error(err.message);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while creating the member.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };





    return (
        <>
            <h2 className="text-center mb-4">Personal Information</h2>

            <h3 style={{ textAlign: 'left' }}>Personal Details</h3>
            <input 
                type="text" 
                className="form-control mb-3" 
                name="fullName" 
                placeholder="Full Name" 
                required 
                value={formData.fullName} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                className="form-control mb-3" 
                name="surname" 
                placeholder="Surname" 
                required 
                value={formData.surname} 
                onChange={handleChange} 
            />
            <input 
                type="email" 
                className="form-control mb-3" 
                name="email" 
                placeholder="Email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
            />
            <input 
                type="tel" 
                className="form-control mb-3" 
                name="phone" 
                placeholder="Phone Number" 
                required 
                value={formData.phone} 
                onChange={handleChange} 
            />
            <textarea 
                className="form-control mb-3" 
                name="address" 
                placeholder="Address" 
                required 
                value={formData.address} 
                onChange={handleChange}
            ></textarea>

            <h3 className='mt-4' style={{ textAlign: 'left' }}>Next Of Kin</h3>
            <input 
                type="text" 
                className="form-control mb-2" 
                name="nextOfKinName" 
                placeholder="Next of Kin Name" 
                value={formData.nextOfKinName} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                className="form-control mb-2" 
                name="nextOfKinSurname" 
                placeholder="Next of Kin Surname" 
                value={formData.nextOfKinSurname} 
                onChange={handleChange} 
            />
            <input 
                type="email" 
                className="form-control mb-2" 
                name="nextOfKinEmail" 
                placeholder="Next of Kin Email" 
                value={formData.nextOfKinEmail} 
                onChange={handleChange} 
            />
            <input 
                type="tel" 
                className="form-control mb-2" 
                name="nextOfKinPhone" 
                placeholder="Next of Kin Phone" 
                value={formData.nextOfKinPhone} 
                onChange={handleChange} 
            />

            <Button onClick={handleAddNextOfKin} variant="primary" style={{ alignSelf: 'flex-start', display: 'block', marginLeft: 0 }}>Add Next of Kin</Button>

            {nextOfKin.length > 0 && (
                <div className="mt-4">
                    <h3 className='mt-4' style={{ textAlign: 'left' }}>Added Next Of Kin</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nextOfKin.map((kin, index) => (
                                <tr key={index}>
                                    <td>{kin.name}</td>
                                    <td>{kin.surname}</td>
                                    <td>{kin.email}</td>
                                    <td>{kin.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <h3 className='mt-4' style={{ textAlign: 'left' }}>Employment Details</h3>
            <input 
                type="text" 
                className="form-control mb-3" 
                name="companyName" 
                placeholder="Company Name" 
                required 
                value={formData.companyName} 
                onChange={handleChange} 
            />
            <input 
                type="text" 
                className="form-control mb-3" 
                name="jobTitle" 
                placeholder="Job Title" 
                required 
                value={formData.jobTitle} 
                onChange={handleChange} 
            />

            <h3 className='mt-4' style={{ textAlign: 'left' }}>Upload Documents</h3>
            <div className="mb-3">
                {['Profile Picture', 'Confirmation from Employer', 'Identity Document', 'Address Proof', 'Signed application form'].map((doc, index) => (
                    <div key={index} className="mb-3">
                        <label className="text-start" style={{ display: 'block' }}>{doc}</label>
                        <input type="file" className="form-control" onChange={(e) => handleFileChange(e, doc)} />
                        {formData.documents[doc] && (
                            <div className="mt-2">
                                <span className="text-success">✔️ Uploaded</span>
                                <Button style={{alignSelf: 'flex-start'}} variant="link" className="ml-2" onClick={() => alert('View document functionality not implemented')}>View</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Button variant="success" onClick={handleSubmit}>Next</Button>
        </>
    );
};

export default PersonalInformation;