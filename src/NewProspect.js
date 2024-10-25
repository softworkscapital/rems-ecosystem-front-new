import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { API_URL } from "./config";

const NewProspect = () => {

    const [prospect_name, setName] = useState('');
    const [prospect_surname, setSurname] = useState('');
    const [user_id, setUserId] = useState(localStorage.getItem('user'));
    const [company, setCompany] = useState('');
    const [product, setProduct] = useState('');
    const [category, setCategory] = useState('');
    const [email, setEmail] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    // const [category, setCategory] = useState('');
    // const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [funnel_stage, setFunnelStage] = useState('');
    const [stage, setStage] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [nxtFollowup, setNxtFollowup] = useState(null);


    useEffect(() => {
        const fetchOptions = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Dummy data
            const dummyDataStages = [
                { id: 1, label: 'Awareness' },
                { id: 2, label: 'Interest' },
                { id: 3, label: 'Decision' },
                { id: 4, label: 'Action' }
            ];

            setStage(dummyDataStages);

            //Dummy Data Categories
            const dummyDataCategories = [
                { id: 1, label: 'Category 1' },
                { id: 2, label: 'Category 2' },
                { id: 3, label: 'Category 3' },
                { id: 4, label: 'Category 4' }
            ];

            setCategories(dummyDataCategories);

            //Dummy Data Categories
            const dummyDataProducts = [
                { id: 1, label: 'Tell Them SMS gateway' },
                { id: 2, label: 'Rems Gas Retail' },
                { id: 3, label: 'Rems Gas Wholesale' },
                { id: 4, label: 'Rems Retail Anything' },
                { id: 5, label: 'Rems Finance' }
            ];

            setProducts(dummyDataProducts);
        }

        fetchOptions();

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const userObj = { prospect_name, prospect_surname, user_id, company, category, product, email, phone1, phone2, funnel_stage, message, nxtFollowup };
        console.log(userObj);

        fetch(`${API_URL}/prospects`, {
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

                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div class="card">
                                            <h5 class="card-header">Add New Prospect</h5>
                                            <div class="card-body">
                                                <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
                                                    <div class="form-group row">
                                                        <label for="name" type="text" class="col-3 col-lg-2 col-form-label text-right">Name</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="name" type="text" value={prospect_name} onChange={e => setName(e.target.value)} required="" placeholder="name" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="surname" class="col-3 col-lg-2 col-form-label text-right">Surname</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="surname" type="text" value={prospect_surname} onChange={e => setSurname(e.target.value)} required="" placeholder="surname" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="company" class="col-3 col-lg-2 col-form-label text-right">Company</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="company" type="text" value={company} onChange={e => setCompany(e.target.value)} required="" placeholder="company" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="product" className="col-3 col-lg-2 col-form-label text-right">Product</label>
                                                        <div className="col-9 col-lg-10">
                                                            <select
                                                                id="product"
                                                                value={product}
                                                                onChange={e => setProduct(e.target.value)}
                                                                required
                                                                className="form-control"
                                                            >
                                                                <option value="">Select a product</option>
                                                                {products.map(option => (
                                                                    <option key={option.id} value={option.label}>{option.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="category" className="col-3 col-lg-2 col-form-label text-right">Categories</label>
                                                        <div className="col-9 col-lg-10">
                                                            <select
                                                                id="category"
                                                                value={category}
                                                                onChange={e => setCategory(e.target.value)}
                                                                required
                                                                className="form-control"
                                                            >
                                                                <option value="">Select a prospect</option>
                                                                {categories.map(option => (
                                                                    <option key={option.id} value={option.label}>{option.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="email" class="col-3 col-lg-2 col-form-label text-right">Email</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required="" placeholder="Email" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="phone" class="col-3 col-lg-2 col-form-label text-right">Phone1</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="phone" type="text" value={phone1} onChange={e => setPhone1(e.target.value)} required="" placeholder="phone" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="phone" class="col-3 col-lg-2 col-form-label text-right">Phone2</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="phone" type="text" value={phone2} onChange={e => setPhone2(e.target.value)} required="" placeholder="phone" class="form-control" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputWebSite" class="col-3 col-lg-2 col-form-label text-right">Follow Up on</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="inputWebSite" type="date" value={nxtFollowup} onChange={e => setNxtFollowup(e.target.value)} required="" placeholder="category" class="form-control" style={{ width: '30%' }} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label class="col-3 col-lg-2 col-form-label text-right">Message</label>
                                                        <div class="col-9 col-sm-8 col-lg-10">
                                                            <textarea required="" value={message} onChange={e => setMessage(e.target.value)} class="form-control"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="stage" className="col-3 col-lg-2 col-form-label text-right">Stage</label>
                                                        <div className="col-9 col-lg-10">
                                                            <select
                                                                id="stage"
                                                                value={funnel_stage}
                                                                onChange={e => setFunnelStage(e.target.value)}
                                                                required
                                                                className="form-control"
                                                            >
                                                                <option value="">Select a stage</option>
                                                                {stage.map(option => (
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
                            </div>

                        </div>

                        <div style={{width: '83%', float: 'right'}}>
                            <Footer></Footer>
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

export default NewProspect;