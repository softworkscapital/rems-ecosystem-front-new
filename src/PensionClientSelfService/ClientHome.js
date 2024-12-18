import React from "react";
import AreaChart from "./components/AreaChart";
import BarChart from "./components/BarChart";
import DonutChart from "./components/DonutChart";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from "./components/Sidebar";
import ProgressCard from "./components/ProgressCard";
import DashboardCards from "./components/DashboardCards";
import ProfileCard from "./components/ProfileCard";
import Contribution from "./components/CurrentContribution";
import BeneficiaryList from "./components/BeneficiaryList";
import { API_URL } from "./config";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const ClientHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState([]);
  const fetchMember = () => {
    const userId = localStorage.getItem("user");
    fetch(`${API_URL}/members/${userId}`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.length === 1) {
          setMember(resp[0]);
          localStorage.setItem("member", resp[0]);
        } else {
          Swal.fire({
            text: "User Terminated!",
            icon: "error",
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        // Swal.fire({
        //   text: "System Boot Failed, Please check your network connection!",
        //   icon: "error",
        // });
      });
  };
  const fetchContributions = () => {
    const userId = localStorage.getItem("user");
    fetch(`${API_URL}/members/${userId}`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.length === 1) {
          setMember(resp[0]);
          localStorage.setItem("member", resp[0]);
        } else {
          Swal.fire({
            text: "User Terminated!",
            icon: "error",
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        // Swal.fire({
        //   text: "System Boot Failed, Please check your network connection!",
        //   icon: "error",
        // });
      });
  };


  fetchMember();
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {" "}
        {/* Ensure main content takes the remaining width */}
        <div>
          <ProfileCard user={member} />
        </div>
        <div>
          <DashboardCards />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Contribution totalContributions={1555} requiredAmount={3250} />
          </div>
          <div className="col-lg-6">
            <BeneficiaryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
