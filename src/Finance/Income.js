import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import { API_URL } from "../config";
import dateFormat from "dateformat";

const Income = () => {
    const [expenses, setExpenses] = useState([]);
    const [staticAcc, setStaticAcc] = useState([]);
    const [showingAccountId, setShowingAccountId] = useState('');
    const [showingPeriodFrom] = useState('2023-10-01');
    const [setShowingAccount, setSetShowingAccount] = useState('');
    const [search, setSearch] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/income`)
            .then(res => res.json())
            .then(resp => {
                setExpenses(resp);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/accountmap/acc/maps/index/exp/Revenue`)
                .then(res => res.json())
                .then(resp => {
                    setStaticAcc(resp);
                })
                .catch(err => {
                    console.log(err.message);
                });
        };
        accounts();
    }, []);

    return (
        <div className="dashboard-main-wrapper" align="left">
            <TopNav />
            <SideBar />

            <div className="dashboard-wrapper">
                <div className="container-fluid dashboard-content">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <h5 className="card-header text-left">Table</h5>
                                <div className="card-body">
                                    <div style={{ overflowX: 'auto', padding: '10px', backgroundColor: '#f0f0f0' }}>
                                        <h6 className="card-header" style={{ margin: 0, display: 'flex',   }}>
                                            <small>
                                                {staticAcc.map(option => (
                                                    <span
                                                        key={option.fin_acc_account_map_id}
                                                        onClick={() => {
                                                            setShowingAccountId(option.fin_acc_account_map_id);
                                                            setSetShowingAccount(option.acc_account_name);
                                                        }}
                                                        style={{ cursor: 'pointer', marginRight: '5px' }}
                                                    >
                                                        {option.acc_account_name} {option.fin_acc_account_balance} {" | "}
                                                    </span>
                                                ))}
                                            </small>
                                        </h6>
                                    </div>

                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                            <select
                                                id="stage"
                                                onChange={e => setSearch(e.target.value)}
                                                required
                                                className="form-control"
                                            >
                                                <option value="">Select an account</option>
                                                {staticAcc.map(option => (
                                                    <option key={option.fin_acc_account_map_id} value={option.acc_account_name}>
                                                        {option.acc_account_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-md-1 text-center">From</div>
                                        <div className="col-md-2">
                                            <input id="dateFrom" type="date" required className="form-control" />
                                        </div>

                                        <div className="col-md-1 text-center">To</div>
                                        <div className="col-md-2">
                                            <input id="dateTo" type="date" required className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <span className="btn btn-primary btnAdd" style={{ height: '2rem' }}>
                                                Show
                                            </span>
                                        </div>

                                      

                                        

                                   
                                    </div>

                                 
                                </div>
                            </div>

                            <br /><br />

                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <h3 className="card-header d-flex justify-content-between align-items-left">
                                        <div className="text-center">
                                        |{showingAccountId}|
                                        {setShowingAccount}
                                       Period From: {showingPeriodFrom}  to {showingPeriodFrom}
                                    </div><div className="col-md-3 text-center">
                                            <h4>Balance: ${balance}</h4>
                                        </div>
                                            <Link className="btn btn-primary btnAdd" to="/addincome">Add Income</Link>
                                        </h3>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-striped table-bordered first">
                                                    <thead>
                                                        <tr>
                                                            <th>Date Paid</th>
                                                            <th>Date For</th>
                                                            <th>Account Name</th>
                                                            <th>Description</th>
                                                            <th>Cost Center</th>
                                                            <th>Debit</th>
                                                            <th>Credit</th>
                                                            <th>Comment</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {expenses.map(item => (
                                                            <tr key={item.fin_acc_admin_expenses_accounts_id}>
                                                                <td>{dateFormat(item.datepaid, "yyyy-mm-dd")}</td>
                                                                <td>{dateFormat(item.dateFor, "yyyy-mm-dd")}</td>
                                                                <td>{item.index_acc_name}</td>
                                                                <td>
                                                                    {item.description} <br />
                                                                    {'('}{item.dual_trans_acc_name}{') '} <br />
                                                                    Paid {item.value} {item.currency} Rate to USD 1 : {item.rate_to_usd} Via {item.pmode} By {item.requester} <br />
                                                                    Ref: {item.txn_reference}
                                                                </td>
                                                                <td>{item.cost_center}</td>
                                                                <td>{item.debit}</td>
                                                                <td>{item.credit}</td>
                                                                <td>{item.comment}</td>
                                                            </tr>
                                                        ))}
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
            </div>
        </div>
    );
}

export default Income;