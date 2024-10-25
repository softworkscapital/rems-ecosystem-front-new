import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const CashBank = () => {

    const [cashbank, setCashBank] = useState([])
    const [staticAcc, setStaticAcc] = useState([]);
    const [search, setSearch] = useState([]);
    const [pageLoad, setPageLoad] = useState(false);
    const [balance, setBalance] = useState('')

    useEffect(() => {
        fetch(`${API_URL}/cashbank`).then(res => {
            return res.json()
        }).then(resp => {
            setCashBank(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/cashbank/acc/${search}`).then(res => {
                return res.json()
            }).then(resp => {
                setCashBank(resp);
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        const accountMap = () => {
            fetch(`${API_URL}/accountmap/acc/maps/acc/name/${search}`).then(res => {
                return res.json()
            }).then(resp => {
                setBalance(resp[0].balance);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        if (pageLoad) {
            accounts();
            accountMap();
        } else {
            setPageLoad(true);
        }
    }, [search])

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/accountmap/acc/maps`).then(res => {
                return res.json()
            }).then(resp => {
                setStaticAcc(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        accounts();
    }, [])

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
                            <div class="container-fluid  dashboard-content">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="page-header">
                                            <h2 class="pageheader-title">Cash & Bank</h2>
                                            <div class="page-breadcrumb">
                                                <nav aria-label="breadcrumb">
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <div class="card">
                                            <h5 class="card-header"> Table</h5>
                                            <div class="card-body">
                                                <div class='row'>
                                                    <div class="input-group input-group-round" style={{ width: '15rem' }}>
                                                        <div class="input-group-prepend">
                                                        </div>
                                                        <select
                                                            id="stage"
                                                            // value={search}
                                                            onChange={e => setSearch(e.target.value)}
                                                            required
                                                            className="form-control"
                                                        >
                                                            <option value="">Select an account</option>
                                                            {staticAcc.map(option => (
                                                                <option key={option.fin_acc_account_map_id} value={`${option.acc_account_name}`}>
                                                                    {`${option.acc_account_name}`}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="input-group input-group-round" style={{ width: '15rem' }}>
                                                        <div class="input-group-prepend">
                                                            <div class="form-group row">
                                                                <label for="datefor" class="col-3 col-lg-2 col-form-label text-right">From</label>
                                                                <div class="col-9 col-lg-10">
                                                                    <input id="datefor" type="date" required="" placeholder="Date For" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="input-group input-group-round" style={{ width: '15rem' }}>
                                                        <div class="input-group-prepend">
                                                            <div class="form-group row">
                                                                <label for="datefor" class="col-3 col-lg-2 col-form-label text-right">To</label>
                                                                <div class="col-9 col-lg-10">
                                                                    <input id="datefor" type="date" required="" placeholder="Date For" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="input-group input-group-round" style={{ width: '15rem' }}>
                                                        <div class="input-group-prepend">
                                                            <div class="form-group row">
                                                                <div class="input-group-prepend" >
                                                                    <a href=""><span className="btn btn-primary btnAdd" style={{ height: '2rem' }}>
                                                                        <i style={{ height: '15px' }}>View all</i>
                                                                    </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col lg-6 ">
                                                            <h3 style={{ color: 'black', textAlign: 'center' }}>Account Name: {search}</h3>
                                                        </div>
                                                        <div class="col lg-6 " style={{ textAlign: 'right' }}>
                                                            <h2 style={{ alignSelf: '' }}>balance: ${balance}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> <br></br><br></br>
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="card">
                                            <h5 class="card-header">Cash & Bank Table {/*<Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/eddexpenses">Add Expenses</Link>*/}</h5>
                                            <div class="card-body" style={{ fontWeight: 'lighter' }}>
                                                <div class="table-responsive">
                                                    <table class="table table-striped table-bordered first" >
                                                        <thead>
                                                            <tr>
                                                                <th>DatePaid</th>
                                                                <th>DateFor</th>
                                                                <th>Account Name</th>
                                                                {/* <th>Dual T/A Name</th> */}

                                                                {/* <th>Date For</th> */}
                                                                <th>Description</th>
                                                                <th>Cost Center</th>

                                                                <th>Debit</th>
                                                                <th>Credit</th>
                                                                <th>Balance</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                cashbank.map((item) => (
                                                                    <tr key={item.fin_acc_admin_expenses_accounts_id}>
                                                                        <td>{dateFormat(item.datepaid, "yyyy-mm-dd")}</td>
                                                                        <td>{dateFormat(item.dateFor, "yyyy-mm-dd")}</td>

                                                                        <td>{item.index_acc_name}</td>
                                                                        {/* <td>{item.dual_trans_acc_name}</td> */}

                                                                        {/* <td>{item.datepaid}</td> */}
                                                                        {/* <td>{item.datefor}</td> */}
                                                                        <td>{item.description} <br></br> {'('}{item.dual_trans_acc_name}{') '}  <br></br> Paid {item.value} {item.currency} Rate to USD 1 : {item.rate_to_usd} Via {item.pmode} By {item.requester} <br></br> Ref: {item.txn_reference} </td>
                                                                        <td>{item.cost_center}</td>

                                                                        <td>{item.debit_bank}</td>
                                                                        <td>{item.credit_bank}</td>

                                                                        <td>{item.balance}</td>
                                                                        {/* <td>
                                                                            <Link to={"/EditClient/" + item.client_profile_id}>Edit </Link>_
                                                                            <a onClick={() => { HandleRemove(item.client_profile_id) }} style={{ color: "blue" }} >Remove</a>
                                                                        </td> */}
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default CashBank;