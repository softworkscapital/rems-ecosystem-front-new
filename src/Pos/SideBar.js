import React, { useEffect, useState } from "react";

const SideBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEcosystemAdmin, setIsEcosystemAdmin] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [role, setRole] = useState();
    const [cart, setCart] = useState();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    // Function to check role and category
    const checkUserRoles = () => {
        const role = localStorage.getItem('async_role');
        const category = localStorage.getItem('async_category');
        setRole(role);
        setCart(category);

        console.log('Fetched role:', role);
        console.log('Fetched category:', category);

        if (role === 'Admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }

        if (category === 'ecosystem_admin') {
            setIsEcosystemAdmin(true);
        } else {
            setIsEcosystemAdmin(false);
        }

        if (!role) {
            window.location.href = '/';
        }
    };

    useEffect(() => {
        checkUserRoles();
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
                <div className="nav-left-sidebar sidebar-dark" style={{ fontSize: '10px', backgroundColor: '#B03F82' }}>
                    <div className="menu-list">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <a className="d-xl-none d-lg-none" href="0">Dashboard</a>
                            <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`}>
                                <ul className="navbar-nav flex-column" style={{ paddingLeft: '0' }}> {/* Added paddingLeft to align items */}
                                    <li className="nav-divider" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }}>
                                        Menu
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }} href="/SalesSettings">Sales Settings</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }} href="/pos">POS</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }} href="/PettyCash">Petty Cash</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }} href="/inventory">Inventory</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }} href="/endshift">End Shift</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }} href="/reports">Reports</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0' }} href="/Invoice">Invoice</a>
                                    </li>

    
                                    <li className="nav-item" style={{ color: 'white' }}>
                                        <a className="nav-link" style={{ color: '#fff', textAlign: 'left', paddingLeft: '0'}} href="/">Logout</a>
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