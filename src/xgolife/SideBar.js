import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaStore, FaBuilding, FaUserPlus, FaBox, FaShoppingCart } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar" style={{ width: '250px', backgroundColor: '#ffffff', height: '100vh', position: 'fixed', borderRight: '1px solid #e0e0e0', textAlign: 'left', paddingTop: '20px' }}>
            <h4 style={{ color: '#343a40', padding: '15px', textAlign: 'center' }}>Navigation</h4>
            <Nav className="flex-column">
                <Nav.Link href="/ViewStore" style={{ color: '#343a40' }}>
                    <FaStore className="me-2" /> Store
                </Nav.Link>
                <Nav.Link href="/CreateCompany" style={{ color: '#343a40' }}>
                    <FaBuilding className="me-2" /> Create Company
                </Nav.Link>
                <Nav.Link href="/CreateBranch" style={{ color: '#343a40' }}>
                    <FaBuilding className="me-2" /> Create Branch
                </Nav.Link>
                <Nav.Link href="/CreateUser" style={{ color: '#343a40' }}>
                    <FaUserPlus className="me-2" /> Create User
                </Nav.Link>
                <Nav.Link href="/AddStock" style={{ color: '#343a40' }}>
                    <FaShoppingCart className="me-2" /> Add Stock
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;