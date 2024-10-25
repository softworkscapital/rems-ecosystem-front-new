import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import { Link } from "react-router-dom";

const Accounts = () => {

    const [accounts, setAccounts] = useState([]);
    const [staticAcc, setStaticAcc] = useState([]);
    const [search, setSearch] = useState([]);
    const [pageLoad, setPageLoad] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/accountinfo`).then(res => {
            return res.json()
        }).then(resp => {
            setAccounts(resp);
            setStaticAcc(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/accountinfo/type/${search}`).then(res => {
                return res.json()
            }).then(resp => {
                setAccounts(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        if (pageLoad) {
            accounts();
        } else {
            setPageLoad(true);
        }
    }, [search])

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
                                            <h2 class="pageheader-title">Accounts</h2>
                                            <div class="page-breadcrumb">
                                                <nav aria-label="breadcrumb">
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="card">
                                            <h5 class="card-header">Accounts Details <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/addaccounts">Add New</Link></h5>
                                            <div class="card-body">
                                                <div class="table-responsive">
                                                    <table class="table table-striped table-bordered first">
                                                        <thead>
                                                            <tr>
                                                                {/* <th>Acc Info Id</th>
                                                                <th>classifier</th> */}
                                                                <th>Account Class</th>
                                                                <th>Account Type</th>
                                                                {/* <th>Account Folio</th> */}
                                                                <th>Explanation</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                accounts.map((item) => (
                                                                    <tr key={item.fin_acc_account_info_id}>
                                                                        {/* <td>{item.fin_acc_account_info_id}</td>
                                                                        <td>{item.classifier}</td> */}
                                                                        <td>{item.fin_acc_account_class}</td>
                                                                        <td>{item.fin_acc_account_type}</td>
                                                                        {/* <td>{item.fin_acc_account_folio}</td> */}
                                                                        <td>{item.Explanation}</td>
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
                    <script src="../assets/vendor/multi-select/js/jquery.multi-select.js"></script>
                    <script src="../assets/libs/js/main-js.js"></script>
                    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
                    <script src="../assets/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
                    <script src="https://cdn.datatables.net/buttons/1.5.2/js/dataTables.buttons.min.js"></script>
                    <script src="../assets/vendor/datatables/js/buttons.bootstrap4.min.js"></script>
                    <script src="../assets/vendor/datatables/js/data-table.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
                    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.html5.min.js"></script>
                    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.print.min.js"></script>
                    <script src="https://cdn.datatables.net/buttons/1.5.2/js/buttons.colVis.min.js"></script>
                    <script src="https://cdn.datatables.net/rowgroup/1.0.4/js/dataTables.rowGroup.min.js"></script>
                    <script src="https://cdn.datatables.net/select/1.2.7/js/dataTables.select.min.js"></script>
                    <script src="https://cdn.datatables.net/fixedheader/3.1.5/js/dataTables.fixedHeader.min.js"></script>
                </body>

            </html>
        </div>

    );
}

export default Accounts;