import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const AddAccount = () => {
    const [userId, setUserId] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [branchId, setBranchId] = useState(null);

    const [classifier, setClassifier] = useState('');
    const [accountClass, setAccountClass] = useState('');
    const [accountType, setAccountType] = useState('');
    const [accountFolio, setAccountFolio] = useState('');
    const [explanation, setExplanation] = useState('');
    const [ListExistingAccountClassifier, setListExistingAccountClassifier] = useState('');
    const [ListExistingAccountClass, setListExistingAccountClass] = useState('');
    const [ListExistingAccountType, setListExistingAccountType] = useState('');
    const [ListExistingAccountName, setListExistingAccountName] = useState('');
    const [ListExistingAccountInfo, setListExistingAccountInfo] = useState([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user');
        const storedCompanyId = localStorage.getItem('company_id');
        const storedBranchId = localStorage.getItem('branch_id');

        setUserId(storedUserId);
        setCompanyId(storedCompanyId);
        setBranchId(storedBranchId);

        const fetchListExistingAccountInfo = async () => {
            try {
                const response = await fetch(`${API_URL}/accountinfo/`);
                const data = await response.json();
                setListExistingAccountInfo(data);
                console.log("ListExistingAccountInfo data", data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchListExistingAccountInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mapObj = { classifier, accountClass, accountType, accountFolio, explanation };
        console.log(mapObj);

        try {
            const response = await fetch(`${API_URL}/accountinfo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mapObj),
            });

            if (response.ok) {
                Swal.fire({
                    text: "Saved successfully",
                    icon: "success"
                });
            } else {
                throw new Error('Error saving account info');
            }
        } catch (err) {
            console.log(err.message);

            const fetchListExistingAccountClass = async () => {
                try {
                    const response = await fetch(`${API_URL}/companies`);
                    const data = await response.json();
                    setListExistingAccountClass(data);
                } catch (error) {
                    console.log(error.message);
                }
            };

            const fetchListExistingAccountType = async () => {
                try {
                    const response = await fetch(`${API_URL}/companies`);
                    const data = await response.json();
                    setListExistingAccountType(data);
                } catch (error) {
                    console.log(error.message);
                }
            };

            const fetchListExistingAccountName = async () => {
                try {
                    const response = await fetch(`${API_URL}/companies`);
                    const data = await response.json();
                    setListExistingAccountName(data);
                } catch (error) {
                    console.log(error.message);
                }
            };

            fetchListExistingAccountClass();
            fetchListExistingAccountType();
            fetchListExistingAccountName();
        }
    };

    return (
        <div>
            <div className="dashboard-main-wrapper">
                <TopNav />
                <SideBar />
                <div className="dashboard-wrapper">
                    <div className="container-fluid dashboard-content">
                        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="card">
                                <h5 className="card-header">Add An Account</h5>
                                <div className="card-body">
                                    <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="classifier" className="col-3 col-lg-2 col-form-label text-right">Classifier</label>
                                            <div className="col-9 col-lg-10">
                                                <select
                                                    id="classifier"
                                                    value={classifier}
                                                    onChange={e => setClassifier(e.target.value)}
                                                    required
                                                    className="form-control"
                                                >
                                                    <option value="">Select Classifier</option>
                                                    {ListExistingAccountInfo.map((item) => (
                                                        <option key={item.fin_acc_account_info_id} value={item.type}>
                                                            {item.fin_acc_account_type} {/* Displaying account class */}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="accountClass" className="col-3 col-lg-2 col-form-label text-right">Account Class</label>
                                            <div className="col-9 col-lg-10">
                                                <input
                                                    id="accountClass"
                                                    value={accountClass}
                                                    onChange={e => setAccountClass(e.target.value)}
                                                    type="text"
                                                    required
                                                    placeholder="Account Class"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="accountType" className="col-3 col-lg-2 col-form-label text-right">Account Type</label>
                                            <div className="col-9 col-lg-10">
                                                <input
                                                    id="accountType"
                                                    value={accountType}
                                                    onChange={e => setAccountType(e.target.value)}
                                                    type="text"
                                                    required
                                                    placeholder="Account Type"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="paymentMode" className="col-3 col-lg-2 col-form-label text-right">Payment Mode</label>
                                            <div className="col-9 col-lg-10">
                                                <input
                                                    id="paymentMode"
                                                    type="text"
                                                    required
                                                    placeholder="Payment Mode"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="accountFolio" className="col-3 col-lg-2 col-form-label text-right">Account Folio</label>
                                            <div className="col-9 col-lg-10">
                                                <input
                                                    id="accountFolio"
                                                    value={accountFolio}
                                                    onChange={e => setAccountFolio(e.target.value)}
                                                    type="text"
                                                    required
                                                    placeholder="Account Folio"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="explanation" className="col-3 col-lg-2 col-form-label text-right">Explanation</label>
                                            <div className="col-9 col-lg-10">
                                                <input
                                                    id="explanation"
                                                    value={explanation}
                                                    onChange={e => setExplanation(e.target.value)}
                                                    type="text"
                                                    required
                                                    placeholder="Explanation"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="row pt-2 pt-sm-5 mt-1">
                                            <div className="col-sm-6 pb-2 pb-sm-4 pb-lg-0 pr-0">
                                                <label className="be-checkbox custom-control custom-checkbox">
                                                    {/* <input type="checkbox" className="custom-control-input" /><span className="custom-control-label">Remember me</span> */}
                                                </label>
                                            </div>
                                            <div className="col-sm-6 pl-0">
                                                <p className="text-right">
                                                    <button type="submit" className="btn btn-space btn-primary">Submit</button>
                                                    <button type="button" className="btn btn-space btn-secondary" onClick={() => console.log('Cancel clicked')}>Cancel</button>
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
            <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
            <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
            <script src="../assets/vendor/slimscroll/jquery.slimscroll.js"></script>
            <script src="../assets/libs/js/main-js.js"></script>
        </div>
    );
}

export default AddAccount;