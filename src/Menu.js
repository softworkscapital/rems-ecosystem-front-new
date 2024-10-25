import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
    const [accessLevel, setAccessLevel] = useState('');

    useEffect(() => {
        // Retrieve category and role from localStorage
        const category = localStorage.getItem("async_category");
        const role = localStorage.getItem("async_role");

        // Log the values
        console.log("Category:", category);
        console.log("Role:", role);

        // Set access level based on the retrieved role
        if (role === "Admin") {
            setAccessLevel(category); // Set access level based on category
        }
    }, []); // Empty dependency array to run only once on mount

    // Function to determine if a card should be enabled
    const isCardEnabled = (cardId) => {
        if (accessLevel === "ecosystem_admin") return true; // Full access
        if (accessLevel === "ecosystem_guest" && cardId === 'posGas') return true; // Guest can access only POS Gas
        if (accessLevel === "company_admin" && (cardId === 'posGas')) return true; // Limited access for Company Admin
        return false; // All other cards are disabled
    };

    // Handle card click
    const handleCardClick = (cardId, event) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (!isCardEnabled(cardId)) {
            toast.error(`Access to ${cardId.replace(/([A-Z])/g, ' $1')} is disabled.`, {
                position: "top-center", 
                hideProgressBar: true, 
                closeOnClick: true, 
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
            });
        } else {
            // Navigate to the link if allowed (you may need to use a router)
            window.location.href = `/${cardId}`; // Adjust according to your routing
        }
    };

    return (
        <div style={{ backgroundColor: 'rgba(113, 116, 141, 0.1)', height: "100vh" }}>
            <ToastContainer />
            <div>
                <div style={{ width: '100%' }}>
                    <div className="container-fluid dashboard-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h2 className="text-center">REMS Business Suite</h2><br />
                            <h3 className="text-center">Main Menu</h3><br />

                                <div className='row' style={{ marginLeft: '1%', textAlign: 'center' }}>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <a href="/funnel" onClick={(e) => handleCardClick('ticketing', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('ticketing') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-1">Ticketing</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <a href="/pos" onClick={(e) => handleCardClick('pos', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('pos') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-1">POS</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <a href="/posgas" onClick={(e) => handleCardClick('posGas', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('posGas') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-1">POS Gas</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <a href="/findashboard" onClick={(e) => handleCardClick('finance', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('finance') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-1">Finance</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <a href="/login" onClick={(e) => handleCardClick('payroll', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('payroll') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-1">Payroll</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;