import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const AddAccount = () => {

    const [classifier, setClassifier] = useState('');
    const [accountClass, setAccountClass] = useState('');
    const [accountType, setAccountType] = useState('');
    const [accountFolio, setAccountFolio] = useState('');
    const [explanation, setExplanation] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        //const linkObj = {debitAccMapId, creditAccMapId, debitTransactionId, creditTransactionId, linkedOn, linkedBy}

        const mapObj = {classifier, accountClass, accountType, accountFolio, explanation};
        console.log(mapObj);

        fetch(`${API_URL}/accountinfo`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(mapObj)
        }).then(res => {
            Swal.fire({
                text: "saved successfully",
                icon: "success"
            });
            // navigate('/Clients')
        }).catch((err) => {
            console.log(err.message)
        })
    }

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
                            <div class="container-fluid dashboard-content">
                                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header">Add An Account</h5>
                                        <div class="card-body">
                                            <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
                                                <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Classifier</label>
                                                    <div class="col-9 col-lg-10">
                                                        {/* <input id="description" type="text" value={value} onChange={e => setValue(e.target.value)} required="" placeholder="Description" class="form-control" /> */}
                                                        <input id="description" value={classifier} onChange={e=> setClassifier(e.target.value)} type="text" required="" placeholder="classifier" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Account Class</label>
                                                    <div class="col-9 col-lg-10">
                                                        {/* <input id="description" type="text" value={value} onChange={e => setValue(e.target.value)} required="" placeholder="Description" class="form-control" /> */}
                                                        <input id="description" value={accountClass} onChange={e=> setAccountClass(e.target.value)} type="text" required="" placeholder="account class" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Account Type</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" value={accountType} onChange={e=> setAccountType(e.target.value)} type="text" required="" placeholder="account type" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Payment Mode</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" type="text" required="" placeholder="payment mode" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Account Folio</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" type="text" required="" placeholder="account folio" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Explanation</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" value={explanation} onChange={e => setExplanation(e.target.value)} type="text" required="" placeholder="explanation" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right"></label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" type="text" required="" placeholder="account folio" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="row pt-2 pt-sm-5 mt-1">
                                                    <div class="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0">
                                                        <label class="be-checkbox custom-control custom-checkbox">
                                                            {/* <input type="checkbox" class="custom-control-input" /><span class="custom-control-label">Remember me</span> */}
                                                        </label>
                                                    </div>
                                                    <div class="col-sm-6 pl-0">
                                                        <p class="text-right">
                                                            <button type="submit" class="btn btn-space btn-primary">Submit</button>
                                                            <button class="btn btn-space btn-secondary">Cancel</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Footer></Footer>
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

export default AddAccount;