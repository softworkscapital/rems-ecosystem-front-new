import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const TopBar = () => {
    return (
        <Navbar style={{ backgroundColor: '#ffffff' }} expand="lg">
            <Navbar.Brand href="#home" style={{ color: 'black' }}>XGoLife</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto py-3">
                    <Nav.Link href="#profile" style={{ color: 'black', marginRight: '20px' }}>Profile</Nav.Link>
                    <Nav.Link href="#logout" style={{ color: 'black', marginRight: '30px' }}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopBar;