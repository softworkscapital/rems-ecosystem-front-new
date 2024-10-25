import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddCostcenter = () => {

    const navigate = useNavigate();

    const [costCenterName, setCostCenterName] = useState();
    const [costCenterSummary, setCostCenterSummary] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();

        const mapObj = {costCenterName, costCenterSummary};
        console.log(mapObj);

        fetch(`${API_URL}/costcenter`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(mapObj)
        }).then(res => {
            Swal.fire({
                text: "saved successfully",
                icon: "success"
            });
            navigate('/costcenter')
        }).catch((err) => {
            console.log(err.message);
            Swal.fire({
                text: "Failed!",
                icon: "error"
            });

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
                                <div class="row" style={{ width: "80rem" }}>
                                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                        <div class="card" style={{ ali: 'center' }}>
                                            <h5 class="card-header">Add Cost Center</h5>
                                            <div class="card-body">
                                                <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
                                                    
                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right">Name</label>
                                                        <div class="col-9 col-lg-8" style={{ marginLeft: '7px' }}>
                                                            <input id="description" type="text" value={costCenterName} onChange={e => setCostCenterName(e.target.value)} required="" placeholder="" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right"> Summary</label>
                                                        <div class="col-9 col-lg-8" style={{ marginLeft: '7px' }}>
                                                            <input id="description" type="text" required="" value={costCenterSummary} onChange={e => setCostCenterSummary(e.target.value)} placeholder="" class="form-control" />
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
        </div >

    );
}

export default AddCostcenter;