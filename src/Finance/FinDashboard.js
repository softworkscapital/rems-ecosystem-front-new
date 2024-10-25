import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";

const FinDashboard = () => {

    const [awareness, setAwareness] = useState(0);
    const [interest, setInterest] = useState(0);
    const [decision, setDecision] = useState(0);
    const [action, setAction] = useState(0);
    const [staticAcc, setStaticAcc] = useState([]);
    const [adminExpBal, setAdminExpBal] = useState(0);
    const [directExpBal, setDirectExpBal] = useState(0);
    const [incomeBal, setIncomeBal] = useState(0);

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/accountmap/acc/maps`).then(res => {
                return res.json()
            }).then(resp => {
                setStaticAcc(resp);
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        accounts();
    }, [])

    useEffect(() => {
        const getAdminExpBal = () => {
            fetch(`${API_URL}/expensesacc/aaccBal/name`).then(res => {
                return res.json()
            }).then(resp => {
                setAdminExpBal(resp[0].total_debit);
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        const getDirectExpBal = () => {
            fetch(`${API_URL}/directexpenses/aaccBal/name`).then(res => {
                return res.json()
            }).then(resp => {
                if (resp[0].total_debit) {
                    setDirectExpBal(resp[0].total_debit);
                } else {
                    setDirectExpBal(0);
                }
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        const getIncomeExpBal = () => {
            fetch(`${API_URL}/income/aaccBal/name`).then(res => {
                return res.json()
            }).then(resp => {
                if (resp[0].total_debit) {
                    setIncomeBal(resp[0].total_debit);
                } else {
                    setDirectExpBal(0);
                }
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        getIncomeExpBal();
        getAdminExpBal();
        getDirectExpBal();
    },)

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
                    <div class="dashboard-main-wrapper">
                        <TopNav></TopNav>
                        <SideBar></SideBar>

                        <div class="dashboard-wrapper">
                            <div class="container-fluid dashboard-content" style={{ backgroundColor: '#fff' }}>
                                <div class="row">
                                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div class="card" style={{ width: "100%", height: "100%", alignItems: "center" }}>
                                            <h5 class="card-header">Summary of Income</h5>
                                            <div class="card-body">
                                                <div class="card-body" style={{ overflowY: "auto", height: "calc(100vh - 50px)" }}>
                                                    <div className="row" style={{ width: "100%", height: "100%" }}>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ marginBottom: '20px', width: '40rem' }}>
                                                            <a href="">
                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    textAlign: 'center',
                                                                    width: "100%",
                                                                    height: "250px",
                                                                    backgroundColor: 'rbga(252, 252, 10, 32',
                                                                    flexDirection: 'column',
                                                                    borderRadius: 50,
                                                                    borderWidth: '10',
                                                                    borderColor: 'black',
                                                                    borderBottom: '5px'

                                                                }}>
                                                                    <div className="row" style={{ width: '100%' }}>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6" >

                                                                            <h4 className="text-muted" style={{ textAlign: 'left' }}>Income: </h4>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6" style={{ textAlign: 'right' }}>
                                                                            <h4 className="text-muted">{incomeBal}</h4>

                                                                        </div>



                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6" >

                                                                            <h4 className="text-muted" style={{ textAlign: 'left' }}>Direct Expenses: </h4>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                                            <h4 className="text-muted" style={{ textAlign: 'right' }}>{directExpBal}</h4>

                                                                        </div>


                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6" >

                                                                            <h4 className="text-muted" style={{ textAlign: 'left' }}> Gross Profit:  </h4>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                                            <h4 className="text-muted" style={{ textAlign: 'right' }}>{incomeBal - directExpBal}</h4>

                                                                        </div>

                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6" >

                                                                            <h4 className="text-muted" style={{ textAlign: 'left' }}>Admin Expenses: </h4>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                                            <h4 className="text-muted" style={{ textAlign: 'right' }}>{adminExpBal}</h4>

                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6" >

                                                                            <h4 className="text-muted" style={{ textAlign: 'left' }}>Net Profit: </h4>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                                            <h4 className="text-muted" style={{ textAlign: 'right' }}>{(incomeBal - directExpBal) - adminExpBal}</h4>

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
                                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div class="card" style={{ width: "100%", height: "100%" }}>
                                            <h3 class="card-header">Company Banks</h3>
                                            <div class="card-body" style={{ overflowY: "auto", height: "calc(100vh - 50px)," }}>
                                                <div className="row" style={{ width: "100%", height: "100%" }}>

                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ marginBottom: '20px' }}>
                                                        <a href="">
                                                            <div style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                                width: "100%",
                                                                // height: "600px",
                                                                backgroundColor: '#cadde6',
                                                                flexDirection: 'column', // Add this to stack elements vertically
                                                                borderRadius: 40,
                                                                padding: '8px',
                                                                paddingTop: '25px'
                                                            }}>

                                                                {staticAcc.map((option) => (
                                                                    <div key={option.fin_acc_account_map_id} >
                                                                        <div>
                                                                            <h4 className="text-muted">{option.acc_account_name}</h4>
                                                                        </div>
                                                                        <div className="metric-value d-inline-block">
                                                                            <p className="mb-1" style={{ fontWeight: 'light', fontSize: '15px' }}>$ {option.balance} <small>{option.currency}</small> </p>
                                                                            <h4>________________</h4>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer></Footer>
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

export default FinDashboard;