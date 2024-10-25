import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { API_URL } from "./config";

const MarketingFunnel = () => {

    const [awareness, setAwareness] = useState(0);
    const [interest, setInterest] = useState(0);
    const [decision, setDecision] = useState(0);
    const [action, setAction] = useState(0);

    const [chatData, setChatData] = useState([]);
    const avatar = '../assets/images/avatar-1.jpg';
    const [user_id, setUserId] = useState(localStorage.getItem('user'));

    useEffect(() => {
        const countAwareness = () => {
            fetch(`${API_URL}/prospects/stage/Awareness`)
                .then((res) => res.json())
                .then((resp) => {
                    console.log("Awareness", resp.length);
                    setAwareness(resp.length)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        const countInterest = () => {
            fetch(`${API_URL}/prospects/stage/Interest`)
                .then((res) => res.json())
                .then((resp) => {
                    console.log("Interest", resp.length);
                    setInterest(resp.length);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        const countDecision = () => {
            fetch(`${API_URL}/prospects/stage/Decision`)
                .then((res) => res.json())
                .then((resp) => {
                    console.log("Decision", resp.length);
                    setDecision(resp.length);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        const countAction = () => {
            fetch(`${API_URL}/prospects/stage/Action`)
                .then((res) => res.json())
                .then((resp) => {
                    console.log("Acction", resp.length);
                    setAction(resp.length)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

        countAwareness();
        countInterest();
        countDecision();
        countAction();
    }, []);

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

        conversations();
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
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

                                        <a href="">
                                            <div class="card" style={{ height: '25rem' }}>
                                                <div class="card-body">
                                                    <h5 class="text-muted">REMS</h5>
                                                    <div class="metric-value d-inline-block">
                                                        <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "5px" }}>Awareness: Total {awareness}</h2>
                                                        <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "5px" }}>Interest: Total {interest}</h2>
                                                        <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "5px" }}>Decision: Total {decision}</h2>
                                                        <h2 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "5px" }}>Action: Total {action}</h2>
                                                    </div>
                                                </div>
                                                <div id="sparkline-revenue"></div>
                                            </div>
                                        </a>

                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

                                        <a href="">
                                            <div class="card" style={{ height: '25rem' }}>
                                                <div class="card-body" style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                                    <h5 class="text-muted">FollowUps today</h5>
                                                    <div class="metric-value d-inline-block">
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
                                                </div>
                                                <div id="sparkline-revenue"></div>
                                            </div>
                                        </a>
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

export default MarketingFunnel;