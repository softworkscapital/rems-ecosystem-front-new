import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import TopNav from './TopNav';
import SideBar from './SideBar';

function OpenShift() {

    const companyId = localStorage.getItem('async_client_profile_id');
    const branchId = localStorage.getItem('branch_id');
    const [branchName, setBranchName] = useState();
    const [companyName, setCompanyName] = useState();
    const operatorId = localStorage.getItem('user');
    const [shiftComment, setShiftComment] = useState('');
    const [syncId, setSyncId] = useState('abc123');

    const username = localStorage.getItem('userName');

    const handleOpenShift = async () => {
        const dateTimeOpen = new Date().toISOString();
        const data = {
            company_id: companyId,
            branch_id: branchId,
            operator_id: operatorId,
            date_time_open: new Date().toISOString(), 
            date_time_close: '', 
            shift_comment: shiftComment,
            syncid: syncId,
        };

        try {
            const response = await fetch(`${API_URL}/shift`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            localStorage.setItem('shiftId', result.insertedId);
            localStorage.setItem('dateTimeOpen', dateTimeOpen);
            alert('Shift opened successfully:');
        } catch (error) {
            console.error('Error opening shift:', error);
            // Handle error (e.g., show an error message)
        }
    };
    useEffect(() => {
        fetch(`${API_URL}/branches/${branchId}`)
            .then(res => res.json())
            .then(resp => {
                setBranchName(resp[0].branch_name);
            })
            .catch(err => console.log(err.message));
    }, [branchId]);

    useEffect(() => {
        fetch(`${API_URL}/clients/${companyId}`)
            .then(res => res.json())
            .then(resp => {
                setCompanyName(resp[0].name);
            })
            .catch(err => console.log(err.message));
    }, [companyId]);

    return (
        <Container>
            <header className="text-center my-4">
                <h1>Rems POS</h1>
                <h1>Initializing Shift</h1>
            </header>

            <div className="mb-3" align="center" style={{ marginRight: '400px', marginLeft: '400px', marginTop: '100px', alignContent: 'center' }}>
                <h5>Confirm Shift Details</h5>
                <p><strong>Name:</strong> {username}</p>
                <p><strong>Company Name:</strong> {companyName}</p>
                <p><strong>Branch ID:</strong> {branchName}</p>
                {/* <p><strong>Operator Name:</strong> {operatorId}</p> */}

                <div className="mb-3">
                    <label htmlFor="shiftComment" className="form-label"><strong>Shift Comment:</strong></label>
                    <input
                        type="text"
                        id="shiftComment"
                        className="form-control"
                        value={shiftComment}
                        onChange={(e) => setShiftComment(e.target.value)}
                        placeholder="Enter shift comment"
                    />
                </div>


                <button className="btn btn-success me-2" style={{ marginTop: '20px' }} onClick={handleOpenShift}>
                    Open Shift
                </button>
            </div>
        </Container>
    );
}

export default OpenShift;
