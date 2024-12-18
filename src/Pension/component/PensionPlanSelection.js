import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Swal from 'sweetalert2';
import { PENSION_API_URL } from './config';

const PensionPlanSelection = () => {
    const [pensionPlans, setPensionPlans] = useState([]);
    const [selectedPlans, setSelectedPlans] = useState([]);
    const membershipId = 'AAA-100005'; // Static membership ID
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch pension products on component mount
    useEffect(() => {
        const fetchPensionPlans = async () => {
            try {
                const response = await fetch(`${PENSION_API_URL}/pension_products`);

                // Check if the response is OK
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error fetching pension products:', errorText);
                    throw new Error(`Failed to fetch pension products: ${errorText}`);
                }

                const data = await response.json();
                console.log('Fetched pension plans:', data); // Log all fetched products
                setPensionPlans(data);
            } catch (error) {
                console.error('Fetch error:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        };

        fetchPensionPlans();
    }, []);

    const togglePensionPlan = (productId) => {
        const isSelected = selectedPlans.includes(productId);
        const updatedPlans = isSelected
            ? selectedPlans.filter(id => id !== productId) // Deselect the plan
            : [...selectedPlans, productId]; // Select the plan

        setSelectedPlans(updatedPlans);
        console.log(`Selected plan ID: ${productId}`); // Log the selected plan ID
    };

    const handleRegister = async () => {
        for (const productId of selectedPlans) {
            const dataToPost = {
                membership_id: membershipId,
                pension_product_id: productId,
            };

            console.log('Object being sent:', dataToPost); // Log the object being sent

            try {
                const response = await fetch(`${PENSION_API_URL}/member_products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToPost),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to post pension plan: ${errorText}`);
                }

                Swal.fire({
                    title: 'Success',
                    text: `Pension plan ${productId} selected successfully!`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                navigate('/Memberships'); 
            } catch (error) {
                console.error('Post error:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    return (
        <>
            <h5>Pension Plans Available:</h5>
            <div className="row">
                {pensionPlans.map((plan) => (
                    <div className="col-md-4 mb-3" key={plan.pension_product_id}>
                        <div 
                            className={`card ${selectedPlans.includes(plan.pension_product_id) ? 'bg-success text-white' : 'bg-light'}`} 
                            style={{ cursor: 'pointer', border: selectedPlans.includes(plan.pension_product_id) ? '2px solid #28a745' : '1px solid #ced4da' }} 
                            onClick={() => togglePensionPlan(plan.pension_product_id)}
                        >
                            <div className="card-body text-left"> {/* Left align text */}
                                <h5 className="card-title">{plan.product_name}</h5>
                                <p className="card-text">{plan.product_description}</p>
                                <p><strong>Minimum Contribution:</strong> {plan.minimum_contribution}</p>
                                <p><strong>Contribution Amount:</strong> {plan.contribution_amount}</p>
                                <p><strong>Currency:</strong> {plan.currency}</p>
                                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); togglePensionPlan(plan.pension_product_id); }}>Select</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-success mt-3" onClick={handleRegister} disabled={selectedPlans.length === 0}>
                Register
            </button>
        </>
    );
};

export default PensionPlanSelection;