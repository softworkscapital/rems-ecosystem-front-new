import React, { useState } from 'react';
import { Modal, Button, Form, Table, Container, Row, Col, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PettyCash() {

    return (
        <Container>
            <header className="text-center my-4">
                <h1>Rems POS</h1>
                <h1 className="text-secondary">Add Petty Cash</h1>
            </header>

            <div className="mb-3" align="center" style={{ marginRight: '300px', marginLeft: '300px', marginTop: '100px', alignContent: 'center',
                borderColor: 'black', borderWidth: '1px'
             }}>
                <div className="mb-3">
                    <input type="text" placeholder='Product Description' className="form-control" style={{ borderRadius: 0 }} />
                </div>

                <div className="mb-3">
                    <input type="text" placeholder='Receipt Total' className="form-control" style={{ borderRadius: 0 }} />
                </div>

                <div className="mb-3">
                    <input type="text" placeholder='Amount Paid' className="form-control" style={{ borderRadius: 0 }} />
                </div>

                <div className="mb-3">
                    <input type="text" placeholder='Change' className="form-control" style={{ borderRadius: 0 }} />
                </div>


                <select
                    className="form-control"
                    style={{
                        borderRadius: 0,
                        backgroundColor: '#fff',
                        height: '40px',
                        marginBottom: '20px'
                    }}
                >
                    <option value="Select Branch">Select Currency</option>
                    <option value="Branch1">USD</option>
                    <option value="Branch2">ZIG</option>
                    <option value="Branch3">RAND</option>
                </select>



                <button className="btn btn-success me-2" style={{ marginTop: '20px' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Add Petty  Cash</Link>
                </button>
            </div>


        </Container>
    );
}

export default PettyCash;
