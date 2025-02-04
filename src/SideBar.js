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
                        {/* <nav class="navbar navbar-expand-lg navbar-light">
                            <a class="d-xl-none d-lg-none" href="0">Dashboard</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav flex-column">
                                    <li class="nav-divider">
                                        Menu
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link active" href="funnel" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"><i class="fa fa-fw fa-user-circle"></i>Dashboard <span class="badge badge-success">6</span></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/prospect" data-toggle="collapse" aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"><i class="fa fa-fw fa-rocket"></i>Add Prospect</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/followup" data-toggle="collapse" aria-expanded="false" data-target="#submenu-3" aria-controls="submenu-3"><i class="fas fa-fw fa-chart-pie"></i>Follow Up</a>
                                    </li>
                                    {isAdmin ?
                                        <li class="nav-item">
                                            <a class="nav-link" href="/newuser" data-toggle="collapse" aria-expanded="false" data-target="#submenu-3" aria-controls="submenu-3"><i class="fas fa-fw fa-chart-pie"></i>Add User</a>
                                        </li>
                                    : null}

                                    <li class="nav-item" style={{marginTop: '340px', color: 'white'}}>
                                        <a class="nav-link" href="/followup" data-toggle="collapse" aria-expanded="false" data-target="#submenu-3" aria-controls="submenu-3"><i class="fas fa-fw fa-chart-pie"></i>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </nav> */}

                        <nav className="navbar navbar-expand-lg navbar-light">
                            <a className="d-xl-none d-lg-none" href="0">Dashboard</a>
                            <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`}>
                                <ul className="navbar-nav flex-column">
                                    <li className="nav-divider" style={{color: '#fff'}}>
                                        Menu
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{fontSize: '12px', color:'#fff'}} href="funnel">Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{fontSize: '12px', color:'#fff'}} href="funnel">Funnel</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{fontSize: '12px', color:'#fff'}} href="/prospect">Add Prospect</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{fontSize: '12px', color:'#fff'}} href="/followup">Follow Up</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" style={{fontSize: '12px', color:'#fff'}} href="/prospect">Add Prospect</a>
                                    </li>
                                    {isAdmin &&
                                        <li className="nav-item">
                                            <a className="nav-link" style={{fontSize: '12px', color:'#fff'}} href="/newuser">Add User</a>
                                        </li>
                                    }
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