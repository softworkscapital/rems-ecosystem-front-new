import React, { useEffect } from "react";

const Menu = () => {
    useEffect(() => {
        // Retrieve category and role from localStorage
        const category = localStorage.getItem("async_category");
        const role = localStorage.getItem("async_role");

        // Log the values
        console.log("Category:", category);
        console.log("Role:", role);
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            <div>
                <html>
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
                        <div style={{ width: '100%' }}>
                            <div className="container-fluid dashboard-content">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h2 className="text-center">REMS Business Suite</h2><br />
                                        <h3 className="text-center">Main Menu</h3><br />

                                        <div className='row' style={{ marginLeft: '1%', textAlign: 'center' }}>
                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12" style={{ pointerEvents: 'none' }}>
                                                <a href="/funnel">
                                                    <div className="card">
                                                        <div className="card-body" style={{ backgroundColor: 'lightgray' }}>
                                                            <h5 className="text-muted">REMS</h5>
                                                            <div className="metric-value d-inline-block">
                                                                <h2 className="mb-1">Ticketing</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12" style={{ pointerEvents: 'none' }}>
                                                <a href="/pos">
                                                    <div className="card">
                                                        <div className="card-body" style={{ backgroundColor: 'lightgray' }}>
                                                            <h5 className="text-muted">REMS</h5>
                                                            <div className="metric-value d-inline-block">
                                                                <h2 className="mb-1">POS</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                                <a href="/posgas">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="text-muted">REMS</h5>
                                                            <div className="metric-value d-inline-block">
                                                                <h2 className="mb-1">POS Gas</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12" style={{ pointerEvents: 'none' }}>
                                                <a href="/findashboard">
                                                    <div className="card">
                                                        <div className="card-body" style={{ backgroundColor: 'lightgray' }}>
                                                            <h5 className="text-muted">REMS</h5>
                                                            <div className="metric-value d-inline-block">
                                                                <h2 className="mb-1">Finance</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12" style={{ pointerEvents: 'none' }}>
                                                <a href="/login">
                                                    <div className="card">
                                                        <div className="card-body" style={{ backgroundColor: 'lightgray' }}>
                                                            <h5 className="text-muted">REMS</h5>
                                                            <div className="metric-value d-inline-block">
                                                                <h2 className="mb-1">Payroll</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>


                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12" style={{ pointerEvents: 'none' }}>
                                                <a href="/login">
                                                    <div className="card">
                                                        <div className="card-body" style={{ backgroundColor: 'lightgray' }}>
                                                            <h5 className="text-muted">REMS</h5>
                                                            <div className="metric-value d-inline-block">
                                                                <h2 className="mb-1">Pension</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* <Footer></Footer> */}
                            </div>
                        </div>
                        <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
                        <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
                        <script src="../assets/vendor/slimscroll/jquery.slimscroll.js"></script>
                        <script src="../assets/libs/js/main-js.js"></script>
                    </body>
                </html>
            </div>
        </div>
    );
}

export default Menu;