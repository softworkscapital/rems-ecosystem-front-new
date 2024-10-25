import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

const KwaunodaLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "131" && password === "131") {
      // Redirect to the external URL
      window.location.href = "https://kwaunoda.softworkscapital.com/";
    } else {
      setError("Invalid email or password");
    }
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
          <div className="card">
            <div className="card-header text-center">
              <h5 style={{ fontSize: 14, color: "grey" }}>Welcome to </h5>
              <h3 ></h3>
              <span className="splash-description" style={{ color: "blue",fontSize: 24, }}>Kwaunoda</span>
              <span className="splash-description">Control Panel</span>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group">
                    <div className="form-control form-control-lg">
                      <FaEnvelope />
                      <input
                        type="text"
                        className="custom-input"
                        id="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        id="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  className="btn btn-lg btn-block"
                  style={{ marginTop: "2rem", width: "100%", backgroundColor: "#FFB81C"}}
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
          </div>
        </div>

        <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
        <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
      </body>
    </div>
  );
};

export default KwaunodaLogin;