import React, { useState, useEffect } from "react";
import { MD5 } from "crypto-js";
import { API_URL } from "./config";
import { BarLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    setPasswordHash(MD5(password).toString());
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordHash);
    setIsLoading(true);
    fetch(`${API_URL}/users/${email}/${passwordHash}`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.length === 1) {
          localStorage.setItem("user", resp[0].userid);
          localStorage.setItem("userName", resp[0].username);
          localStorage.setItem(
            "async_client_profile_id",
            resp[0].client_profile_id
          );
          localStorage.setItem("async_role", resp[0].role);
          localStorage.setItem("async_category", resp[0].category);
          localStorage.setItem("async_username", resp[0].email);
          localStorage.setItem("branch_id", resp[0].branch_id);
          localStorage.setItem("company_id", resp[0].company_id);
          console.log(resp);
                    window.location.href = "/MainMenu";
        } else {
          Swal.fire({
            text: "Incorrect Username or Password!",
            icon: "error",
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        Swal.fire({
          text: "Login failed, check your network connection!",
          icon: "error",
        });
      });
  };

  return (
    <div>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Login</title>
        <link
          rel="stylesheet"
          href="../assets/vendor/bootstrap/css/bootstrap.min.css"
        />
        <link
          href="../assets/vendor/fonts/circular-std/style.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="../assets/libs/css/style.css" />
        <link
          rel="stylesheet"
          href="../assets/vendor/fonts/fontawesome/css/fontawesome-all.css"
        />
        <style>
          {`
                        .custom-input {
                            border: none;
                            padding-left: 10px;
                            width: 90%;
                        }
                        .custom-input:focus {
                            outline: none; /* Remove default outline */
                            box-shadow: none; /* Remove any box shadow */
                        }
                    `}
        </style>
      </head>

      <body
        style={{
          height: "100%",
          display: "-ms-flexbox flex",
          msFlexAlign: "center",
          alignItems: "center",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div className="splash-container">
          <div className="card ">
            <div className="card-header text-center">
              <h5 style={{ fontSize: 14, color: "grey" }}>Welcome to </h5>
              <h2 style={{ color: "blue" }}>REMS</h2>
              <span className="splash-description">Business Suite</span>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group">
                    <div className="form-control form-control-lg">
                      <FaEnvelope />
                      <input
                        type="text"
                        className="custom-input"
                        value={email}
                        onChange={(e) => setUsername(e.target.value)}
                        id="email"
                        placeholder="Email"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <div className="form-control form-control-lg d-flex align-items-center">
                      <FaLock className="mr-2" />
                      <input
                        type="password"
                        className="custom-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        required
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group d-flex justify-content-start">
                  <label className="custom-control custom-checkbox">
                    <input className="custom-control-input" type="checkbox" />
                    <span className="custom-control-label">Remember Me</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  style={{ marginTop: "2rem", width: "100%" }}
                >
                  Sign in
                </button>
              </form>
            </div>
            <div className="card-footer bg-white p-0">
              <div className="card-footer-item card-footer-item-bordered">
                <a
                  href="/account/registration"
                  className="footer-link"
                  style={{ textDecoration: "none" }}
                >
                  Create An Account
                </a>
              </div>
              <div className="card-footer-item card-footer-item-bordered">
                <a
                  href="0"
                  className="footer-link"
                  style={{ textDecoration: "none" }}
                >
                  Forgot Password
                </a>
              </div>
            </div>
            {isLoading && (
              <BarLoader size={40} width={"100%"} color="blue" loading />
            )}
          </div>
        </div>

        <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
        <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
      </body>
    </div>
  );
};

export default Login;
