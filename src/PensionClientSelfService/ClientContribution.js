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
import { useNavigate } from 'react-router-dom';
import ContributionTable from "./components/Contribution";



const ClientContribution = () => {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate('/MakePayments'); // Replace with your target path
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        {" "}
        {/* Ensure main content takes the remaining width */}
        <div>
          <ProfileCard />
        </div>
        <div style={{ marginBottom: "20px" }}>
        <button className="btn btn-primary" onClick={handleClick}>
            Make Payments
        </button>
        </div>
        <div>
          <ContributionTable />
        </div>
      </div>
    </div>
  );
};

export default ClientContribution;
