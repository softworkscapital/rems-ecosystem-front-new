import React, { useEffect, useState } from "react";
import AreaChart from "./component/AreaChart";
import BarChart from "./component/BarChart";
import DonutChart from "./component/DonutChart";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import ProgressCard from './component/ProgressCard';
import DashboardCards from './component/DashboardCards';
import ProfileCardSummary from "./component/ProfileCardSummary";
import TopNav from "./component/TopNav";
import { Container, Row, Col } from 'react-bootstrap';
import { API_URL } from "./component/config";

const InvestmentFundsOverview = () => {
  const [investments, setInvestments] = useState([]);
  const [funds, setFunds] = useState([]);
  const [selectedFundId, setSelectedFundId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch(`${API_URL}/fin_acc_investment_fund_details`);
        if (!response.ok) {
          throw new Error("Failed to fetch funds");
        }
        const data = await response.json();
        setFunds(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!selectedFundId) return; // Don't fetch if no fund is selected

      try {
        const response = await fetch(`${API_URL}/fin_acc_investment_assets_account/joined_fund_and_assets_day_month_year/${selectedFundId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch investments");
        }
        const data = await response.json();
        setInvestments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInvestments();
  }, [selectedFundId]); // Call this effect whenever selectedFundId changes

  const handleFundChange = (event) => {
    setSelectedFundId(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle errors
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          <div>
            <select className="p-3" onChange={handleFundChange} value={selectedFundId}>
              <option value="">Select an Investment</option>
              {funds.map((fund) => (
                <option
                  key={fund.investment_fund_details_id}
                  value={fund.investment_fund_details_id}
                >
                  {fund.name}
                </option>
              ))}
            </select>
          </div>
          <div className="p-4">
            {investments.length === 0 ? (
              <div>No investments found for this fund.</div>
            ) : (
              investments.map((investment, index) => (
                <ProfileCardSummary key={index} investmentData={investment} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentFundsOverview;