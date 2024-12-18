import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Track the currently open dropdown

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown); // Toggle the selected dropdown
    };

    useEffect(() => {
        // const role = localStorage.getItem('async_role');
        // if (role === 'Admin') {
        //     setIsAdmin(true);
        // }
        // if (role === '' || role === null) {
        //     window.location.href = '/';
        // }
    }, []);

    return (
        <div>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>Concept - Bootstrap 4 Admin Dashboard Template</title>
                <link rel="stylesheet" href="../assets/vendor/bootstrap/css/bootstrap.min.css" />
                <link href="../assets/vendor/fonts/circular-std/style.css" rel="stylesheet" />
                <link rel="stylesheet" href="../assets/libs/css/style.css" />
                <link rel="stylesheet" href="../assets/vendor/fonts/fontawesome/css/fontawesome-all.css" />
            </head>
            <body>
                <div className="nav-left-sidebar sidebar-dark" style={{ fontSize: '10px', backgroundColor: '#CD1DE3', textAlign: 'left' }}>
                    <div className="menu-list">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`}>
                                <ul className="navbar-nav flex-column">
                                    <li className="">
                                        <a className="nav-link" href="" style={{ fontSize: '16px', color: '#fff', textAlign: 'left', fontWeight: 'bold' }}>Menu</a>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            onClick={() => toggleDropdown('customerServices')}
                                            style={{ fontSize: '14px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            Customer Services
                                            <FontAwesomeIcon
                                                icon={openDropdown === 'customerServices' ? faChevronUp : faChevronDown}
                                                style={{ color: '#fff' }}
                                            />
                                        </a>
                                        {openDropdown === 'customerServices' && (
                                            <ul className="nav flex-column">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/Dashboard" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Dashboard <span className="badge badge-success">6</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/PensionHome" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Home
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/Memberships" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Memberships
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/ApproveMembers" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Approve Members
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/Programmes" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>Customer Programmes</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/CustomerProfile" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Customer Services
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/TimeKeepings" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>Communications</a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            onClick={() => toggleDropdown('investments')}
                                            style={{ fontSize: '14px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            Investments
                                            <FontAwesomeIcon
                                                icon={openDropdown === 'investments' ? faChevronUp : faChevronDown}
                                                style={{ color: '#fff' }}
                                            />
                                        </a>
                                        {openDropdown === 'investments' && (
                                            <ul className="nav flex-column">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/ContributionsPayments" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Pay Contributions
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/ContributionsRecievedAccounts" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Contributions Received
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/PlanContribution" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Plan Contributions
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            onClick={() => toggleDropdown('finance')}
                                            style={{ fontSize: '14px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            Finance
                                            <FontAwesomeIcon
                                                icon={openDropdown === 'finance' ? faChevronUp : faChevronDown}
                                                style={{ color: '#fff' }}
                                            />
                                        </a>
                                        {openDropdown === 'finance' && (
                                            <ul className="nav flex-column">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/InvestmentFundsOverwiew" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Investment Funds Overview
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/Products" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Products
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/AddInvesmentFund" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Add Investment Fund
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/ApproveAsset" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Approve Asset
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/PurchaseInvestment" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Purchase Investment
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/investimentFund" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Investment Funds
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/InvestmentAssets" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Investments Assets
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/InvestmentPortifolios" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Investment Portfolios
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/RunPayRoll" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Portfolio Revenue & Accounts
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/PaySlips" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Investment Portfolio Analysis
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/PaySlips" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Overall Fund Analysis
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/Banks" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Reports
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/FinStatementsMenu" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        Financial Statements
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            onClick={() => toggleDropdown('backOffices')}
                                            style={{ fontSize: '14px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        >
                                            Back Offices
                                            <FontAwesomeIcon
                                                icon={openDropdown === 'backOffices' ? faChevronUp : faChevronDown}
                                                style={{ color: '#fff' }}
                                            />
                                        </a>
                                        {openDropdown === 'backOffices' && (
                                            <ul className="nav flex-column">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/Allowances" style={{ fontSize: '12px', color: '#fff', marginLeft: '30px' }}>
                                                        PayOuts
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href="/Payscal" style={{ fontSize: '12px', color: '#fff', marginBottom: 80 }}>Rules</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Payscal" style={{ fontSize: '12px', color: '#fff' }}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default SideBar;