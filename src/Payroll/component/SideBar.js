import React, { useEffect, useState } from "react";

const SideBar = () => {
    const [isAdmin, setIsAdmin] = useState('');

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };


    useEffect(() => {

        // const role = localStorage.getItem('async_role');
        // if (role === 'Admin') {
            // setIsAdmin(true);
        // }
        // if (role === '' || role === null) {
            // window.location.href = '/';
        // }

    }, [])

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
                <div class="nav-left-sidebar sidebar-dark" style={{fontSize: '10px', backgroundColor: '#B03F82', textAlign: 'left'}}>
                    <div class="menu-list">

                        <nav className="navbar navbar-expand-lg navbar-light">
                            {/* <a className="d-xl-none d-lg-none" href="0">Finance Dashboard</a> */}
                            <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`}>
                                <ul className="navbar-nav flex-column">
                                    <li className="">
                                        <a className="nav-link" href="" style={{fontSize: '16px',  color: '#fff', textAlign: 'left', fontWeight: 'bold'}}>Menu </a>
                                    </li>
                                    <li className="nav-item">
                                        {/* <a className="nav-link active" href="findashboard" style={{fontSize: '12px'}}   >Dashboard <span className="badge badge-success">6</span></a> */}
                                        <a className="nav-link" href="" style={{fontSize: '12px',  color: '#fff' }}   >Dashboard <span className="badge badge-success">6</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/EmployeeDetails" style={{fontSize: '14px', color:'#fff'}}>Employee Details</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/EmployeeRecords" style={{fontSize: '14px', color:'#fff'}}>Employee Records</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollAddAttendanceRecord" style={{fontSize: '14px', color:'#fff'}}>Attendances</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollEmployeeRoles" style={{fontSize: '14px', color:'#fff'}}>Employee Roles</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollAllowances" style={{fontSize: '14px', color:'#fff'}}>Allowances</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollDeductions" style={{fontSize: '14px', color:'#fff'}}>Deductions</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Payscales" style={{fontSize: '14px', color:'#fff'}}>PayScales</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollTimeKeepings" style={{fontSize: '14px', color:'#fff'}}>Time Keeping</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayRuns" style={{fontSize: '14px', color:'#fff'}}>PayRun</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollPayRuns" style={{fontSize: '14px', color:'#fff'}}>Run Payroll</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollPaySlips" style={{fontSize: '14px', color:'#fff'}}>PaySlip</a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollankDetails" style={{fontSize: '14px', color:'#fff'}}>Banks</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollPayscal" style={{fontSize: '14px', color:'#fff'}}>Productivity Review</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollPayScales" style={{fontSize: '14px', color:'#fff'}}>Job Reviews</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollControlAccount" style={{fontSize: '14px', color:'#fff'}}>Control Account</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/NewMembers2" style={{fontSize: '14px', color:'#fff'}}>Job Reviews</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollPensionHome2" style={{fontSize: '14px', color:'#fff'}}>Remittances OutPut Files</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/PayrollBankFilePreView" style={{fontSize: '14px', color:'#fff'}}>Bank Transafres</a>
                                    </li>
                               

                                    <li className="nav-item" style={{ marginTop: '220px', color: '#fff' }}>
                                        <a style={{ color: '#fff' }} className="nav-link" href="/">Logout</a>
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