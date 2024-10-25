import React, { useEffect, useState } from "react";

const SideBar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEcosystemAdmin, setIsEcosystemAdmin] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const[role, setRole] = useState();
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

        // Console log the fetched role and category
        console.log('Fetched role:', role);
        console.log('Fetched category:', category);

        if (role === 'Admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false); // Optional: Resetting if not Admin
        }

        if (category === 'ecosystem_admin') {
            setIsEcosystemAdmin(true);
        } else {
            setIsEcosystemAdmin(false); // Optional: Resetting if not Ecosystem Admin
        }

        // Redirect if role is empty or null
        if (!role) {
            window.location.href = '/';
        }
    };

    useEffect(() => {
        checkUserRoles(); // Call the function to check roles
    }, []); // Empty dependency array ensures this runs only once

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
                                <ul className="navbar-nav flex-column">
                                    <li className="nav-divider" style={{ color: '#fff' }}>
                                        Menu
                                    </li>
                                    <li className="nav-divider" style={{ color: '#fff' }}>
                                       {role}
                                       {cart}
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" style={{ fontSize: '12px', color: '#fff' }} href="/funnel">Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ fontSize: '12px', color: '#fff' }} href="/prospect">Add Prospect</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{ fontSize: '12px', color: '#fff' }} href="/followup">Follow Up</a>
                                    </li>
                                    
                                    {isAdmin && isEcosystemAdmin && (
                                        <>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ fontSize: '12px', color: '#fff' }} href="/view">View</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" style={{ fontSize: '12px', color: '#fff' }} href="/market">Market</a>
                                            </li>
                                        </>
                                    )}

                                    {isAdmin && (
                                        <li className="nav-item">
                                            <a className="nav-link" style={{ fontSize: '12px', color: '#fff' }} href="/newuser">Add User</a>
                                        </li>
                                    )}
                                    <li className="nav-item" style={{ color: 'white' }}>
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