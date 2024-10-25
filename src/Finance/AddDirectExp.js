import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddDirectExp = () => {

    //New   
    const curDate = new Date();
    const [fin_acc_account_map_id, setFinAccAccountMap] = useState(0);
    const [index_acc_name_id, setIndexAccNameId] = useState(0);
    const [index_acc_name, setIndexAccName] = useState('');
    const [dual_trans_acc_name_id, setDualTransAccNameId] = useState(0);
    const [dual_trans_acc_name, setDualTransAccName] = useState('');
    const [datepaid] = useState(curDate);
    const [datefor, setDatefor] = useState("");
    const [description, setDescription] = useState("");
    const [cost_center, setCostCenter] = useState("");
    const [link] = useState(0);
    const [currency] = useState("USD");
    const [rate_to_usd] = useState(1);
    const [value, setValue] = useState(0);
    const [debit, setDebit] = useState(0);
    const [credit, setCredit] = useState(0);
    const [pmode, setPmode] = useState("Cash");
    const [requester, setRequester] = useState('');
    const [confirmed] = useState(true);
    const [authorized] = useState(true);
    const [comitted] = useState(true);
    const [txn_reference, setRef] = useState('');
    const [flag] = useState(0);
    const [comment, setComment] = useState('');

    const [accMap, setAccMap] = useState([]);
    const [cashbank, setCashBank] = useState([]);
    const [costCenter, setCostCenters] = useState([]);
    const [map, setMap] = useState('');

    const [debitAccMapId, setDebitAccMapId] = useState();
    const [creditAccMapId, setCreditAccMapId] = useState();
    const [debitTransactionId, setDebitTransactionId] = useState();
    const [creditTransactionId, setCreditTransactionId] = useState();
    const [linkedOn] = useState(curDate);
    const [linkedBy, setLinkedBy] = useState('');

    const [search, setSearch] = useState('');
    const [search2, setSearch2] = useState('');
    const [creditBalance, setBalance] = useState(0);
    const [debitBalance, setdebitBalance] = useState(0);
    const [debitBal, setdebitBal] = useState(0);
    const [creditBal, setcreditBal] = useState(0);

    const [isLoaded, setIsLoaded] = useState(false);

    const [transHistoty, setTransHistory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setDebitAccMapId(fin_acc_account_map_id);
    }, [fin_acc_account_map_id])

    useEffect(() => {
        setCreditAccMapId(index_acc_name_id);
    }, [index_acc_name_id])

    useEffect(() => {
        setDebitTransactionId(dual_trans_acc_name_id);
    }, [dual_trans_acc_name_id])

    useEffect(() => {
        setCreditTransactionId(dual_trans_acc_name_id);
    }, [dual_trans_acc_name_id])

    useEffect(() => {
        setDebit(value);
    }, [value])

    useEffect(() => {
        const link = async () => {
            await setLinkedBy(localStorage.getItem('userName'))
            await setRequester(localStorage.getItem('userName'));
        }

        link();

    }, [])

    useEffect(() => {
        if (isLoaded) {
            const calculations = async () => {
                const checkBal = creditBal - credit
                const checkDebit = debitBal + debit
                await setBalance(checkBal);
                await setdebitBalance(checkDebit);
                // alert(checkDebit);
                // alert(checkBal);
            }

            calculations();
        }
        else {
            setIsLoaded(true)
        }
    }, [value])



    const handleSubmit = (e) => {
        e.preventDefault();

        // const linkObj = {debitAccMapId, creditAccMapId, debitTransactionId, creditTransactionId, linkedOn, linkedBy}

        const mapObj = { debitAccMapId, creditAccMapId, debitTransactionId, creditTransactionId, linkedOn, linkedBy, fin_acc_account_map_id, index_acc_name_id, index_acc_name, dual_trans_acc_name_id, dual_trans_acc_name, datepaid, datefor, description, cost_center, link, currency, rate_to_usd, value, debit, credit, pmode, requester, confirmed, authorized, comitted, txn_reference, flag, comment, creditBalance, debitBalance };
        console.log(mapObj);

        fetch(`${API_URL}/accountlinking/postdirect`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(mapObj)
        }).then(res => {
            Swal.fire({
                text: "saved successfully",
                icon: "success"
            });
            console.log(linkedBy);
            navigate('/directexpenses');
        }).catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {

        fetch(`${API_URL}/accountmap/acc/maps/index/info`).then(res => {
            return res.json()
        }).then(resp => {
            setCashBank(resp);
            console.log('qwerty', resp);
        }).catch((err) => {
            console.log(err.message);
        })

        fetch(`${API_URL}/costcenter`).then(res => {
            return res.json()
        }).then(resp => {
            setCostCenters(resp);
            console.log('qwerty', resp);
        }).catch((err) => {
            console.log(err.message);
        })

    }, []);

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/accountmap/acc/maps/index/exp/Direct Expenses`).then(res => {
                return res.json()
            }).then(resp => {
                setAccMap(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }
        accounts();
    }, [])

    useEffect(() => {
        const accountMap = () => {
            fetch(`${API_URL}/accountmap/acc/maps/acc/name/${search}`).then(res => {
                return res.json()
            }).then(resp => {
                setdebitBal(resp[0].balance);
                // alert(search + ' debiit Bal: ' +debitBal);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        accountMap();
    }, [search])

    useEffect(() => {
        const accountMap = () => {
            fetch(`${API_URL}/accountmap/acc/maps/acc/name/${search2}`).then(res => {
                return res.json()
            }).then(resp => {
                setcreditBal(resp[0].balance);
                // alert(search2 + '  Credit Bal: ' +creditBal);
            }).catch((err) => {
                console.log(err.message);
            })
        }

        accountMap();
    }, [search2])

    useEffect(() => {
        const accounts = () => {
            fetch(`${API_URL}/directexpenses/get/acc/limit`).then(res => {
                return res.json()
            }).then(resp => {
                setTransHistory(resp);
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            })
        }
        accounts();
    }, [])


    const handleOption = (id, name) => {
        // alert('The ID is: ' + id);
        setFinAccAccountMap(id);
        setMap(name);
        setSearch(name);
    }

    const handleIndexAcc = (id, name) => {
        // alert('The ID is: ' + id);
        // alert('The Name is: ' + name);
        setIndexAccNameId(id);
        setIndexAccName(name);
        setSearch2(name);
    }

    const handleDualIndexAcc = (id, name) => {
        setDualTransAccNameId(id);
        setDualTransAccName(name);

        setFinAccAccountMap(id);
        setMap(name);
        setSearch(name);
    }

    function handleChange(newValue) {
        const numValue = Number(newValue);
        setValue(numValue);
        setDebit(numValue);
        setCredit(numValue);
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
                                <div class="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div class="card" style={{ width: '65%' }}>
                                            <h5 class="card-header">Add Direct Expenses</h5>
                                            <div class="card-body">
                                                <form id="form" data-parsley-validate="" novalidate="" onSubmit={handleSubmit}>
                                                    <div class="form-group row">
                                                        <label for="fin_acc_account_map_id" class="col-3 col-lg-2 col-form-label text-right">Account Name</label>

                                                        <div class="col-9 col-lg-10" >
                                                            <select
                                                                id="stage"
                                                                value={map}
                                                                // onChange={e => handleOption(accMap.find(option => option.acc_account_name === e.target.value).fin_acc_account_map_id)}
                                                                onChange={e => {
                                                                    const selectedOption = accMap.find(option => option.acc_account_name === e.target.value);
                                                                    handleDualIndexAcc(selectedOption.fin_acc_account_map_id, selectedOption.acc_account_name);
                                                                }}
                                                                required
                                                                className="form-control"
                                                            >
                                                                <option value="">Select account map</option>
                                                                {accMap.map(option => (
                                                                    <option key={option.fin_acc_account_map_id} value={option.acc_account_name}>
                                                                        {`${option.acc_account_name}`}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="fin_acc_account_map_id" class="col-3 col-lg-2 col-form-label text-right">From</label>
                                                        <div class="col-9 col-lg-10">
                                                            <select
                                                                id="stage"
                                                                value={index_acc_name}
                                                                // value={map}
                                                                // onChange={e => setMap(e.target.value)} 
                                                                // onChange={e => handleIndexAcc(cashbank.find(option => option.index_acc_name === e.target.value).index_acc_name_id)}
                                                                onChange={e => {
                                                                    const selectedOption = cashbank.find(option => option.acc_account_name === e.target.value);
                                                                    handleIndexAcc(selectedOption.fin_acc_account_map_id, selectedOption.acc_account_name);
                                                                }}
                                                                required
                                                                className="form-control"
                                                            >
                                                                <option value="">Index ACC Name</option>
                                                                {cashbank.map(option => (
                                                                    <option key={option.fin_acc_account_map_id} value={`${option.acc_account_name}`}>
                                                                        {`${option.acc_account_name}`}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {/* 
                                                <div class="form-group row">
                                                    <label for="fin_acc_account_map_id" class="col-3 col-lg-2 col-form-label text-right">Dual T Acc</label>
                                                    <div class="col-9 col-lg-10">
                                                        <select
                                                            id="stage"
                                                            value={dual_trans_acc_name}
                                                            // onChange={e => setMap(e.target.value)}
                                                            //onChange={e => handleDualIndexAcc(cashbank.find(option => option.dual_trans_acc_name === e.target.value).dual_trans_acc_name_id)}
                                                            onChange={e => {
                                                                const selectedOption = cashbank.find(option => option.acc_account_name === e.target.value);
                                                                handleDualIndexAcc(selectedOption.fin_acc_account_map_id, selectedOption.acc_account_name);
                                                            }}
                                                            required
                                                            className="form-control"
                                                        >
                                                            <option value="">Dual Trans Acc Name</option>
                                                            {cashbank.map(option => (
                                                                <option key={option.fin_acc_account_map_id} value={`${option.acc_account_name}`}>
                                                                    {`${option.acc_account_name}`}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div> */}

                                                    {/* <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Payment Mode</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" type="text" value={pmode} onChange={e => setPmode(e.target.value)} required="" placeholder="payment mode" class="form-control" />
                                                    </div>
                                                </div> */}

                                                    <div class="form-group row">
                                                        <label for="fin_acc_account_map_id" class="col-3 col-lg-2 col-form-label text-right">Cost Center</label>
                                                        <div class="col-9 col-lg-10">
                                                            <select
                                                                id="stage"
                                                                // value={map}
                                                                onChange={e => setCostCenter(e.target.value)}
                                                                required
                                                                className="form-control"
                                                            >
                                                                <option value="">Select cost center</option>
                                                                {costCenter.map(option => (
                                                                    <option key={option.fin_acc_account_cost_centers_id} value={`${option.cost_center_name}`}>
                                                                        {`${option.cost_center_name}`}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="datefor" class="col-3 col-lg-2 col-form-label text-right">Date For</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="datefor" type="datetime-local" value={datefor} onChange={e => setDatefor(e.target.value)} required="" placeholder="Date For" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right">Description</label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} required="" placeholder="Description" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right">Amount</label>
                                                        <div class="col-9 col-lg-10">
                                                            {/* <input id="description" type="text" value={value} onChange={e => setValue(e.target.value)} required="" placeholder="Description" class="form-control" /> */}
                                                            <input id="description" type="text" value={value} onChange={e => handleChange(e.target.value)} required="" placeholder="amount" class="form-control" />
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="description" class="col-3 col-lg-2 col-form-label text-right">Txn Ref: </label>
                                                        <div class="col-9 col-lg-10">
                                                            <input id="description" type="text" value={txn_reference} onChange={e => setRef(e.target.value)} required="" placeholder="" class="form-control" />
                                                        </div>
                                                    </div>

                                                    {/* <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Payment Mode</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" type="text" value={value} onChange={e => setValue(e.target.value)} required="" placeholder="Description" class="form-control" />
                                                    </div>
                                                </div> */}

                                                    {/* <div class="form-group row">
                                                    <label for="description" class="col-3 col-lg-2 col-form-label text-right">Comment</label>
                                                    <div class="col-9 col-lg-10">
                                                        <input id="description" type="text" value={comment} onChange={e => setComment(e.target.value)} required="" placeholder="comment" class="form-control" />
                                                    </div>
                                                </div> */}

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
                                        <div class="col-xl-4 col-lg-4 col-md-3 col-sm-12 col-12">
                                            <div class="card" style={{ ali: 'center', height: '39rem' }}>
                                                <h5 class="card-header">History</h5>
                                                <div class="card-body" >
                                                    <div id="combo-box" style={{
                                                        width: '95%',
                                                        height: '30rem',
                                                        overflowY: 'auto',
                                                        backgroundColor: '#fff',
                                                        padding: '10px'
                                                    }}>
                                                        {transHistoty.map(option => (
                                                            <div key={option.fin_acc_account_info_id} style={{
                                                                padding: '10px',
                                                                borderBottom: '1px solid #ccc'
                                                            }}>
                                                                {option.description}
                                                            </div>
                                                        ))}
                                                    </div>
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
        </div>

    );
}

export default AddDirectExp;