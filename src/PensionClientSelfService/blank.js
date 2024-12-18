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
import { useNavigate } from "react-router-dom";
import ContributionTable from "./components/Contribution";
const FAQ = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/MakePayments"); // Replace with your target path
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
        <div>
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-gray-900">my herding</h6>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
