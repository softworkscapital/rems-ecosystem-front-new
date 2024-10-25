import React from "react";

const MainMenu = () => {
    return (
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
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                    <h2 className="my-4">Softworks Products</h2>
                                    <h3 className="my-4">Affiliates Only</h3>

                                    <div className='row justify-content-center'>
                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
                                            <a href="/login" style={{ textDecoration: 'none' }}>
                                                <div className="card" style={{ backgroundColor: '#ADD8E6', color: 'white', height: '200px' }}>
                                                    <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                                                        <h2 className="mb-1">Business Suite</h2>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
                                            <a href="https://tellthem.softworkscapital.com/" style={{ textDecoration: 'none' }}>
                                                <div className="card" style={{ backgroundColor: '#ADD8E6', color: 'white', height: '200px' }}>
                                                    <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                                                        <h2 className="mb-1">Tell Them</h2>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
                                            <a href="/KwaunodaLogin" style={{ textDecoration: 'none' }}>
                                                <div className="card" style={{ backgroundColor: '#ADD8E6', color: 'white', height: '200px' }}>
                                                    <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                                                        <h2 className="mb-1">Kwaunoda</h2>
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
    );
}

export default MainMenu;