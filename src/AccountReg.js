import React, { useState, useEffect } from "react";
import { MD5 } from 'crypto-js';
import { API_URL } from "./config";
import { BarLoader } from "react-spinners";
import Swal from "sweetalert2";

const AccReg = () => {

    return (
        <div>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>Registration</title>
                <link rel="stylesheet" href="../assets/vendor/bootstrap/css/bootstrap.min.css" />
                <link href="../assets/vendor/fonts/circular-std/style.css" rel="stylesheet" />
                <link rel="stylesheet" href="../assets/libs/css/style.css" />
                <link rel="stylesheet" href="../assets/vendor/fonts/fontawesome/css/fontawesome-all.css" />
            </head>

            <body
                style={{
                    height: '100%',
                    display: '-ms-flexbox flex',
                    // display: '',
                    msFlexAlign: 'center',
                    alignItems: 'center',
                    paddingTop: '40px',
                    paddingBottom: '40px',
                }}
            >
                <div class="splash-container">

                </div>
                <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
                <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
            </body>
        </div >
    );
}

export default AccReg;