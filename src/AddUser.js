import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { API_URL } from "./config";
import { MD5 } from 'crypto-js';

const AddUser = () => {


    const [companyId, setCompanyId] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [products, setProducts] = useState([]);

    const [password1, setPassword] = useState('000000');
    const [password, setPasswordHash] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // useEffect(()=>{
    //     setPasswordHash(MD5(password).toString());
    // },[password])

    useEffect(() => {

        setPasswordHash(MD5(password1).toString());
        const fetchOptions = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            //Dummy Data Categories
            const dummyDataProducts = [
                { id: 1, label: 'Admin' },
                { id: 2, label: 'Category' },
            ];

            setProducts(dummyDataProducts);
        }

        fetchOptions();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const userObj = { companyId, username, role, email, password };
        console.log(userObj);

        fetch(`${API_URL}/users/user`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userObj)
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
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div class="card">
                                        <h5 class="card-header">Add New User</h5>
                                        <div class="card-body">
                                            <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
                                                <div class="form-group row">
                                                    <label for="name" type="text" class="col-3 col-lg-2 col-form-label text-right">Company ID</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="name" type="text" value={companyId} onChange={e => setCompanyId(e.target.value)} required="" placeholder="Company id" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="name" type="text" class="col-3 col-lg-2 col-form-label text-right">Name</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="name" type="text" value={username} onChange={e => setUsername(e.target.value)} required="" placeholder="name" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="surname" class="col-3 col-lg-2 col-form-label text-right">Email</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} required="" placeholder="email" class="form-control" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="role" className="col-3 col-lg-2 col-form-label text-right">Role</label>
                                                    <div className="col-9 col-lg-10">
                                                        <select
                                                            id="role"
                                                            value={role}
                                                            onChange={e => setRole(e.target.value)}
                                                            required
                                                            className="form-control"
                                                        >
                                                            <option value="">Select Role</option>
                                                            {products.map(option => (
                                                                <option key={option.id} value={option.label}>{option.label}</option>
                                                            ))}
                                                        </select>
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

export default AddUser;

// {/* <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
//                                         <div class="card">
//                                             <h5 class="card-header">Add New User</h5>
//                                             <div class="card-body">
//                                                 <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
//                                                     <div class="form-group row">
//                                                         <label for="name" type="text" class="col-3 col-lg-2 col-form-label text-right">Company ID</label>
//                                                         <div class="col-9 col-lg-10">
//                                                             <input id="name" type="text" value={companyId} onChange={e => setCompanyId(e.target.value)} required="" placeholder="Company id" class="form-control" />
//                                                         </div>
//                                                     </div>
//                                                     <div class="form-group row">
//                                                         <label for="name" type="text" class="col-3 col-lg-2 col-form-label text-right">Name</label>
//                                                         <div class="col-9 col-lg-10">
//                                                             <input id="name" type="text" value={username} onChange={e => setUsername(e.target.value)} required="" placeholder="name" class="form-control" />
//                                                         </div>
//                                                     </div>
//                                                     <div class="form-group row">
//                                                         <label for="surname" class="col-3 col-lg-2 col-form-label text-right">Email</label>
//                                                         <div class="col-9 col-lg-10">
//                                                             <input id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} required="" placeholder="email" class="form-control" />
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-group row">
//                                                         <label htmlFor="role" className="col-3 col-lg-2 col-form-label text-right">Role</label>
//                                                         <div className="col-9 col-lg-10">
//                                                             <select
//                                                                 id="role"
//                                                                 value={role}
//                                                                 onChange={e => setRole(e.target.value)}
//                                                                 required
//                                                                 className="form-control"
//                                                             >
//                                                                 <option value="">Select Role</option>
//                                                                 {products.map(option => (
//                                                                     <option key={option.id} value={option.label}>{option.label}</option>
//                                                                 ))}
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                     <div class="row pt-2 pt-sm-5 mt-1">
//                                                         <div class="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0">
//                                                             <label class="be-checkbox custom-control custom-checkbox">
//                                                                 {/* <input type="checkbox" class="custom-control-input" /><span class="custom-control-label">Remember me</span> */}
//                                                             </label>
//                                                         </div>
//                                                         <div class="col-sm-6 pl-0">
//                                                             <p class="text-right">
//                                                                 <button type="submit" class="btn btn-space btn-primary">Submit</button>
//                                                                 <button class="btn btn-space btn-secondary">Cancel</button>
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div> */}