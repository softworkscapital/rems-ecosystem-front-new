import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
    const [accessLevel, setAccessLevel] = useState('');

    useEffect(() => {
        const category = localStorage.getItem("async_category");
        const role = localStorage.getItem("async_role");

        console.log("Category:", category);
        console.log("Role:", role);

        if (role === "Admin") {
            setAccessLevel(category); 
        }
    }, []);

    const isCardEnabled = (cardId) => {
        if (accessLevel === "ecosystem_admin") return true; 
        if (accessLevel === "ecosystem_guest" && cardId === 'posGas') return true; 
        if (accessLevel === "company_admin" && (cardId === 'posGas')) return true; 
        return false; 
    };

    const handleCardClick = (cardId, event) => {
        event.preventDefault(); 
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
            window.location.href = `/${cardId}`; 
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

                                <div className='row' style={{ marginLeft: '1%', textAlign: 'center', marginTop: '20px' }}>
                                    {/* First row with 4 cards */}
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                        <a href="/funnel" onClick={(e) => handleCardClick('funnel', e)}>
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

                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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

                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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

                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                        <a href="/accountmap" onClick={(e) => handleCardClick('accountmap', e)}>
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
                                </div>

                                {/* Second row for the last 3 cards */}
                                <div className='row' style={{ marginTop: '20px', textAlign: 'center', marginLeft: 10 }}>
                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                        <a href="/PayrollEmployeeDetails" onClick={(e) => handleCardClick('PayrollEmployeeDetails', e)}>
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

                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                        <a href="/Dashboard" onClick={(e) => handleCardClick('Dashboard', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('Dashboard') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-1">Pension</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    

                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                        <a href="/ClientLogin" onClick={(e) => handleCardClick('ClientLogin', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('PensionClientSelfService') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-3" style={{fontSize: 22}}>Pension Client Self Service</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>


                                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                        <a href="/ClientLogin" onClick={(e) => handleCardClick('ClientLogin', e)}>
                                            <div className="card">
                                                <div className="card-body" style={{ backgroundColor: isCardEnabled('PensionClientSelfService') ? 'white' : 'lightgray' }}>
                                                    <h5 className="text-muted">REMS</h5>
                                                    <div className="metric-value d-inline-block">
                                                        <h2 className="mb-3" style={{fontSize: 22}}>X-GO</h2>
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