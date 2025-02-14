import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
    return (
        <div className="sidebar" style={{ width: '250px', backgroundColor: '#ffffff', height: '100vh', position: 'fixed', borderRight: '1px solid #e0e0e0', textAlign: 'left' }}>
            <h4 style={{ color: 'black', padding: '15px' }}>Navigation</h4>
            <Nav className="flex-column">
                <Nav.Link href="/ViewStore" style={{ color: 'black' }}>Store</Nav.Link>
                <Nav.Link href="/CreateCompany" style={{ color: 'black' }}>Create Company</Nav.Link>
                <Nav.Link href="/CreateBranch" style={{ color: 'black' }}>Create Branch</Nav.Link>
                <Nav.Link href="/CreateUser" style={{ color: 'black' }}>Create User</Nav.Link>
                <Nav.Link href="/AddStock" style={{ color: 'black' }}>Add Stock</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;