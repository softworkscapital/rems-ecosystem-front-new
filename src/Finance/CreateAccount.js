import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const navigate = useNavigate();

    const [classifier, setClassifier] = useState('');
    const [accountClass, setAccountClass] = useState('');
    const [accountType, setAccountType] = useState('');
    const [accountFolio, setAccountFolio] = useState('');
    const [explanation, setExplanation] = useState('');

    const [staticAcc, setStaticAcc] = useState([]);
    const [projects, setProjects] = useState([]);
    const [staticAccTyp, setStaticAccTyp] = useState([]);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('');
    const [type, setType] = useState([]);
    const [accClass, setClass] = useState([]);
    const [pageLoad, setPageLoad] = useState(false);
    // 
    const [fin_acc_account_project_id, setFin_acc_account_project_id] = useState('');
    // const [created_on, setCreated_on] = useState(''); Backend
    const [fin_acc_account_info_id, setFin_acc_account_info_id] = useState('');
    const [acc_account_name, setAcc_account_name] = useState('');
    const [created_by, setCreated_by] = useState('');
    const [authorized] = useState(true);
    const [currency, setCurrency] = useState('USD');
    const [group_id, setGroup_id] = useState(1);
    // const [prospect_id, setProspect_id] = useState('');
    const [balance] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const mapObj = { fin_acc_account_info_id, fin_acc_account_project_id, acc_account_name, created_by, authorized, currency, group_id, balance };
        console.log(mapObj);

        fetch(`${API_URL}/accountmap`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(mapObj)
        }).then(res => {
            Swal.fire({
                text: "saved successfully",
                icon: "success"
            });
            navigate('/expenses')
        }).catch((err) => {
            console.log(err.message);
            Swal.fire({
                text: "Failed!",
                icon: "error"
            });

        })
    }

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/accountinfo`).then(res => {
                return res.json()
            }).then(resp => {
                setStaticAcc(resp);
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }
        accounts();
    }, []);

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/projects`).then(res => {
                return res.json()
            }).then(resp => {
                setProjects(resp);
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }
        accounts();
    }, []);

    useEffect(() => {
        setClass([]);
        const accounts = () => {
            const filteredData = staticAcc.filter(
                item => item.fin_acc_account_class === search
            );
            setType(filteredData);
            console.log('TYPE', filteredData);
        }
        accounts();

        if (pageLoad) {
            accounts();
        } else {
            setPageLoad(true);
        }
    }, [search])

    const handleType = (id) => {
        setClass([]);
        fetch(`${API_URL}/accountmap/acc/maps/info/${id}`)
            .then(res => res.json())
            .then(resp => {
                setClass(resp);
                console.log('DETAILS: ', resp)
            })
            .catch((err) => {
                console.log(err.message);
            });

        setFin_acc_account_info_id(id);
    };

    const handleProject = (id) => {
        // fetch(`${API_URL}/accountmap/acc/maps/info/${id}`)
        //     .then(res => res.json())
        //     .then(resp => {
        //         // setClass(resp);
        //         console.log('PROJECT DETAILS: ', resp)
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
        // alert(id);
        setFin_acc_account_project_id(id);
    };

    useEffect(() => {
        const link = async () => {
            await setCreated_by(localStorage.getItem('userName'))
        }

        link();

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
                            <div class="container-fluid dashboard-content">
                                <div class="row" style={{ width: "80rem" }}>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="card" style={{ ali: 'center' }}>
                                            <h5 class="card-header">Create Account</h5>
                                            <div class="card-body">
                                                <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right" >Account Class</label>
                                                        <div class="col-3 col-lg-2 " style={{ marginLeft: '7px' }}>

                                                            <div class="input-group input-group-round" style={{ width: '15rem' }}>
                                                                <div class="input-group-prepend">
                                                                </div>
                                                                <select
                                                                    id="stage"
                                                                    value={search}
                                                                    onChange={e => setSearch(e.target.value)}
                                                                    required
                                                                    className="form-control"
                                                                >
                                                                    <option value="">Select an account</option>
                                                                    {staticAcc.map(option => (
                                                                        <option key={option.fin_acc_account_info_id} value={`${option.fin_acc_account_class}`}>
                                                                            {`${option.fin_acc_account_class}`}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right" style={{ marginLeft: '7px' }}>Account Type</label>
                                                        <div class="col-3 col-lg-2 ">

                                                            <div class="input-group input-group-round" style={{ width: '15rem' }}>
                                                                <div class="input-group-prepend">
                                                                </div>
                                                                <select
                                                                    id="stage"
                                                                    onChange={e => {
                                                                        const selectedOption = type.find(option => option.fin_acc_account_type === e.target.value);
                                                                        handleType(selectedOption.fin_acc_account_info_id);
                                                                    }}
                                                                    required
                                                                    className="form-control"
                                                                >
                                                                    <option value="">Select account map</option>
                                                                    {type.map(option => (
                                                                        <option key={option.fin_acc_account_info_id} value={option.fin_acc_account_type}>
                                                                            {`${option.fin_acc_account_type}`}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right">Account Name</label>
                                                        <div class="col-9 col-lg-8" style={{ marginLeft: '7px' }}>
                                                            <input id="description" type="text" value={acc_account_name} onChange={e => setAcc_account_name(e.target.value)} required="" placeholder="" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right"> Currency</label>
                                                        <div class="col-9 col-lg-8" style={{ marginLeft: '7px' }}>
                                                            <input id="description" type="text" required="" onChange={e => setCurrency(e.target.value)} placeholder="" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right" style={{ marginLeft: '7px' }}>Project</label>
                                                        <div class="col-3 col-lg-2 ">

                                                            <div class="input-group input-group-round" style={{ width: '15rem' }}>
                                                                <div class="input-group-prepend">
                                                                </div>
                                                                <select
                                                                    id="stage"
                                                                    onChange={e => {
                                                                        const selectedOption = projects.find(option => option.project_name === e.target.value);
                                                                        handleProject(selectedOption.fin_acc_account_project_id);
                                                                    }}
                                                                    required
                                                                    className="form-control"
                                                                >
                                                                    <option value="">Select project</option>
                                                                    {projects.map(option => (
                                                                        <option key={option.fin_acc_account_project_id} value={option.project_name}>
                                                                            {`${option.project_name}`}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
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
                                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div class="card" style={{ ali: 'center', height: '27rem' }}>
                                            <h5 class="card-header">Available accounts</h5>
                                            <div class="card-body" >
                                                <div id="combo-box" style={{
                                                    width: '95%',
                                                    height: '20rem',
                                                    overflowY: 'auto',
                                                    backgroundColor: '#fff',
                                                    padding: '10px'
                                                }}>
                                                    {accClass.map(option => (
                                                        <div key={option.fin_acc_account_info_id} style={{
                                                            padding: '10px',
                                                            borderBottom: '1px solid #ccc'
                                                        }}>
                                                            {option.acc_account_name}
                                                        </div>
                                                    ))}
                                                </div>
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

export default CreateAccount;