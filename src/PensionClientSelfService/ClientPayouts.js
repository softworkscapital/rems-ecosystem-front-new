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
import PayOutsTable from "./components/PayOuts";


const ClientPayouts = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {" "}
        {/* Ensure main content takes the remaining width */}
        <div>
          <ProfileCard />
        </div>
        <div>
          <PayOutsTable />
        </div>
      </div>
    </div>
  );
};

export default ClientPayouts;
