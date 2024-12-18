// src/Dashboard.js
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


const ClientDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {" "}
        {/* Ensure main content takes the remaining width */}
        <div >
          <ProfileCard />
        </div>
        <div >
          <DashboardCards />
        </div>
        <div className="row">
          <div className="col-lg-6 col-lg-4  ">
            <BarChart />
          </div>
          <div className="col-xl-3 col-md-6 mb-4 ">
            <DonutChart />
          </div>
          <div className="col-xl-3 col-md-6 mb-4  ">
            <ProgressCard />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-lg-4  ">
            <AreaChart />
          </div>
          <div className="col-lg-8 col-lg-4  ">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
