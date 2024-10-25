import React, { useEffect, useState } from "react";

const SideBar = () => {
    const [isAdmin, setIsAdmin] = useState('');

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };


    useEffect(() => {

        const role = localStorage.getItem('async_role');
        if (role === 'Admin') {
            setIsAdmin(true);
        }
        if (role === '' || role === null) {
            window.location.href = '/';
        }

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
                <div class="nav-left-sidebar sidebar-dark"  style={{fontSize: '10px', backgroundColor: '#B03F82'}}>
                    <div class="menu-list">

                        <nav className="navbar navbar-expand-lg navbar-light">
                            <a className="d-xl-none d-lg-none" href="0">Finance Dashboard</a>
                            <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`}>
                                <ul className="navbar-nav flex-column">
                                    <li className="nav-divider" style={{color: '#fff'}}>
                                        Menu
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="findashboard"style={{fontSize: '12px', color:'#fff'}}   >Dashboard <span className="badge badge-success">6</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/accounts"style={{fontSize: '12px', color:'#fff'}}>Accounts</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/accountmap"style={{fontSize: '12px', color:'#fff'}}>Account Map</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/income"style={{fontSize: '12px', color:'#fff'}}>Income</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/directexpenses"style={{fontSize: '12px', color:'#fff'}}>Direct Expenses</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/expenses"style={{fontSize: '12px', color:'#fff'}}>Admin Expenses</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/cashbank"style={{fontSize: '12px', color:'#fff'}}>Banks & Cash</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/projects"style={{fontSize: '12px', color:'#fff'}}>Projects</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/costcenter"style={{fontSize: '12px', color:'#fff'}}>Cost Center</a>
                                    </li>


                                    {/* {isAdmin &&
                                        <li className="nav-item">
                                            <a className="nav-link" href="/newuser">Add User</a>
                                        </li>
                                    } */}
                                    <li className="nav-item" style={{ marginTop: '340px', color: 'white' }}>
                                        <a className="nav-link" href="/">Logout</a>
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