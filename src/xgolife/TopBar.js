import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const TopBar = () => {
    return (
        <Navbar style={{ backgroundColor: '#ffffff' }} expand="lg" className="shadow-sm">
            <Navbar.Brand href="#home" style={{ color: '#343a40', fontWeight: 'bold' }}>XGoLife</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto py-3">
                    <Nav.Link href="#profile" style={{ color: '#343a40', marginRight: '20px' }}>
                        <FaUser className="me-2" /> Profile
                    </Nav.Link>
                    <Nav.Link href="#logout" style={{ color: '#343a40', marginRight: '30px' }}>
                        <FaSignOutAlt className="me-2" /> Logout
                    </Nav.Link>
                    <Link to="/XGoSwitchView"> 
                        <Button 
                            variant="outline-secondary" 
                            style={{ marginLeft: '10px' }}>
                            Switch View
                        </Button>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopBar;