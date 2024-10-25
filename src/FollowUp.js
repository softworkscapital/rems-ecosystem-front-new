import React, { useState, useEffect } from "react";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { API_URL } from "./config";
import Swal from "sweetalert2";

const FollowUp = () => {

    const [options, setOptions] = useState([]);
    const [email, setEmali] = useState('');
    const [phone, setPhone] = useState('');
    const [funnel_stage, setFunnelStage] = useState('');
    const [stage, setStage] = useState([]);
    const [prospects, setProspects] = useState([]);
    const [nxtFollowup, setNxtFollowup] = useState(null);
    const [msg, setMsg] = useState('');
    const [user_id, setUserId] = useState(localStorage.getItem('user'));
    const [prospect_id, setProspectId] = useState('');

    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [pageLoad, setPageLoad] = useState(false);

    const avatar = '../assets/images/avatar-1.jpg';

    useEffect(() => {
        //Get Conversations
        const conversations = () => {

            try {
                fetch(`${API_URL}/funnelcon/funcon/${user_id}`)
                    .then(res => res.json())
                    .then(resp => {
                        console.log(resp)
                        setChatData(resp)
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
                // setIsLoaded(true); // Variables have been loaded
            } catch (error) {
                console.log(error);
            }
        }

        // Simulating fetching options from a database
        const fetchOptions = () => {
            // Dummy data
            const dummyOptions = [
                { id: 1, value: 'Takudzwa Muvhawa', label: 'Takudzwa Muvhawa' },
                { id: 2, value: 'Takunda Choga', label: 'Takunda Choga' },
                { id: 3, value: 'Carthbert Munedzi', label: 'Carthbert Munedzi' },
            ];

            setOptions(dummyOptions);
        };

        // Dummy data
        const dummyDataStages = [
            { id: 1, label: 'Awareness' },
            { id: 2, label: 'Interest' },
            { id: 3, label: 'Decision' },
            { id: 4, label: 'Action' }
        ];

        setStage(dummyDataStages);

        //Get Prospects
        const getProspects = () => {

            try {
                // fetch(`${API_URL}/funnelcon/funcon/${user_id}`)
                fetch(`${API_URL}/prospects/prospects/user/userid/${user_id}`)
                    // fetch(`${API_URL}/prospects`)
                    .then(res => res.json())
                    .then(resp => {
                        // console.log(user_id)
                        console.log(resp)
                        setProspects(resp)
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
                // setIsLoaded(true); // Variables have been loaded
            } catch (error) {
                console.log(error);
            }
        }

        // Dummy data
        // const dummyDataProspects = [
        //     { id: 1, label: 'Takura test' },
        //     { id: 2, label: 'Interest' },
        //     { id: 3, label: 'Decision' },
        //     { id: 4, label: 'Action' }
        // ];

        // setProspects(dummyDataProspects);

        getProspects();
        fetchOptions();
        conversations();
        setUserId(localStorage.getItem('user'));
    }, []);

    useEffect(() => {
        const countAwareness = () => {
            fetch(`${API_URL}/prospects/name/Takudzwa/Muvhawa`)
                .then((res) => res.json())
                .then((resp) => {
                    console.log(resp);
                    setEmali(resp[0].email);
                    setPhone(resp[0].phone1);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

        countAwareness();

    }, []);

    useEffect(() => {
        const conversations = async () => {
            try {
                const response = await fetch(`${API_URL}/funnelcon/funcon/${user_id}`);
                const resp = await response.json();
                const [firstName, ...rest] = search.split(' ');
                const lastName = rest.join(' ').trim();
                setName(firstName);
                setSurname(lastName);
                const filteredData = resp.filter(
                    item => item.prospect_name === firstName && item.prospect_surname === lastName
                );
                setChatData(filteredData);

                if (filteredData.length > 0) {
                    // console.log("Filtered data", filteredData[0].prospect_id)
                    setProspectId(filteredData[0].prospect_id);
                    console.log("Prospect ID: ", prospect_id)
                } else {
                    // setProspectId(0);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (pageLoad) {
            conversations();
        } else {
            setPageLoad(true);
        }

    }, [search]);

    const checkID = () => {
        if (prospect_id === '') {
            alert('NOT FOUND')
        }
        // else{
        //     alert(prospect_id);
        // }
    }

    const [chatData, setChatData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (prospect_id === '') {
            alert('Select a client to continue');
        } else {
            const userObj = { prospect_id, user_id, msg, funnel_stage, nxtFollowup };
            console.log(userObj);

            fetch(`${API_URL}/funnelcon/post`, {
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
                            <div class="main-container">
                                <div class="navbar bg-white breadcrumb-bar border-bottom">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li><a href="index.html">Overview</a>
                                            </li>
                                            <li>  &nbsp; | &nbsp; <a href="pages-app.html">App Pages</a>
                                            </li>
                                            <li aria-current="page">  &nbsp; | &nbsp; Chat</li>
                                        </ol>
                                    </nav>
                                    <div class="dropdown">
                                        <button class="btn btn-outline-light btn-sm" data-toggle="dropdown" aria-expanded="false">
                                            <i class="fas fa-cog"></i>
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="0">Manage Members</a>
                                            <a class="dropdown-item" href="0">Subscribe</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item text-danger" href="0">Leave Chat</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-container">
                                    <div class="chat-module">
                                        <div class="chat-module-top">
                                            <form>
                                                {/* <div class="input-group input-group-round">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">
                                                            <i class="fas fa-search"></i>
                                                        </span>
                                                    </div>
                                                    <input type="search" value={search} onChange={e => setSearch(e.target.value)} class="form-control filter-list-input" placeholder="Search chat" aria-label="Search Chat" />
                                                </div> */}
                                                <div class="input-group input-group-round">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">
                                                            <i class="fas fa-search"></i>
                                                        </span>
                                                    </div>
                                                    <select
                                                        id="stage"
                                                        value={search}
                                                        onChange={e => setSearch(e.target.value)}
                                                        required
                                                        className="form-control"
                                                    >
                                                        <option value="">Select a stage</option>
                                                        {prospects.map(option => (
                                                            <option key={option.prospect_id} value={`${option.prospect_name} ${option.prospect_surname}`}>
                                                                {`${option.prospect_name} ${option.prospect_surname}`}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div class="input-group-prepend" >
                                                        <a href=""><span class="input-group-text">
                                                            <i style={{ height: '15px' }}>View all</i>
                                                        </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="chat-module-body">
                                                {chatData.map((chat, index) => (
                                                    <div key={index} className="media chat-item">
                                                        <img alt={chat.author} src={avatar} className="rounded-circle user-avatar-lg" />
                                                        <div className="media-body">
                                                            <div className="chat-item-title">
                                                                <span className="chat-item-author">{chat.prospect_name} {chat.prospect_surname}</span>
                                                                <span>
                                                                    {chat.msg_time} &nbsp; &nbsp;
                                                                    {new Date(chat.msg_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                                </span>
                                                            </div>
                                                            <div className="chat-item-body">
                                                                <p>{chat.msg}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div class="chat-module-bottom">
                                            <form class="chat-form">
                                                <textarea class="form-control" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type message" rows="1"></textarea>
                                                <div class="chat-form-buttons">
                                                    <button type="button" class="btn btn-link">
                                                        <i class="far fa-smile"></i>
                                                    </button>
                                                    <div class="custom-file custom-file-naked">
                                                        <input type="file" class="custom-file-input" id="customFile" />
                                                        <label class="custom-file-label" for="customFile">
                                                            <i class="fas fa-paperclip"></i>
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="row">
                                                <div className="form-group col-xl-6 col-lg-6 col-sm-12 col-xs-12 d-flex align-items-center" >
                                                    <label for="inputWebSite" >Follow Up on</label>

                                                    <input id="inputWebSite" type="date" value={nxtFollowup} onChange={e => setNxtFollowup(e.target.value)} required="" placeholder="category" class="form-control" style={{ width: '70%' }} />

                                                </div>
                                                <div className="form-group col-xl-4 d-flex align-items-center">
                                                    <label htmlFor="stage" className="col-form-label text-right mr-2">Stage</label>
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
                                                <div className="form-group col-xl-2" >
                                                    <button type="button" onClick={handleSubmit} className="btn btn-space btn-primary" >Save</button>
                                                    {/* <button type="button" onClick={checkID} className="btn btn-space btn-primary" >Test</button> */}
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
                </body >

            </html >
        </div >
    );
}

export default FollowUp;