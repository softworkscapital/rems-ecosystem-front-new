import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

const Projects = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch(`${API_URL}/projects`).then(res => {
            return res.json()
        }).then(resp => {
            setProjects(resp);
        }).catch((err) => {
            console.log(err.message);
        })
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
                                            <h2 class="pageheader-title">Projects</h2>
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
                                            <h5 class="card-header">Projects Table {/*<Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/eddexpenses">Add Expenses</Link>*/}</h5>
                                            <div class="card-body" style={{ fontWeight: 'lighter' }}>
                                                <div class="table-responsive">
                                                    <table class="table table-striped table-bordered first" >
                                                        <thead>
                                                            <tr>
                                                                <th>Project ID</th>
                                                                <th>Project Code</th>
                                                                <th>Project Name</th>
                                                                <th>Project Summary</th>
                                                                <th>Created On</th>
                                                                <th>Created By</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                projects.map((item) => (
                                                                    <tr key={item.fin_acc_account_project_id}>
                                                                        <td>{item.fin_acc_account_project_id}</td>
                                                                        <td>{item.project_code}</td>
                                                                        <td>{item.project_name}</td>
                                                                        <td>{item.project_summary}</td>
                                                                        <td>{dateFormat(item.project_created_on, "yyyy-mm-dd")}</td>
                                                                        <td>{item.project_created_by}</td>
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

export default Projects;