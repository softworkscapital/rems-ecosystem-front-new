import React, { useEffect, useState } from "react";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import TopNav from "./component/TopNav";
import { API_URL } from "./component/config";

const FinUnclaimedBenefitsAgeAnalysis = () => {
  const [categorizedData, setCategorizedData] = useState(null);

  const processTransactions = (response) => {
    const data = {
      "0-11": { count: 0, totalBalance: 0, label: "Less than 1 Year" },
      "12-23": { count: 0, totalBalance: 0, label: "From 1 - 2 Years" },
      "24-60": { count: 0, totalBalance: 0, label: "From 2 - 5 Years" },
      "72-120": { count: 0, totalBalance: 0, label: "From 6 - 10 Years" },
      "moreThan120": { count: 0, totalBalance: 0, label: "More than 10 Years" },
    };

    response.forEach((transaction) => {
      const monthsBehind = transaction.months_behind;
      const balance = transaction.balance || 0;

      if (monthsBehind >= 0 && monthsBehind <= 11) {
        data["0-11"].count += 1;
        data["0-11"].totalBalance += balance;
      } else if (monthsBehind >= 12 && monthsBehind <= 23) {
        data["12-23"].count += 1;
        data["12-23"].totalBalance += balance;
      } else if (monthsBehind >= 24 && monthsBehind <= 60) {
        data["24-60"].count += 1;
        data["24-60"].totalBalance += balance;
      } else if (monthsBehind >= 72 && monthsBehind <= 120) {
        data["72-120"].count += 1;
        data["72-120"].totalBalance += balance;
      } else if (monthsBehind > 120) {
        data["moreThan120"].count += 1;
        data["moreThan120"].totalBalance += balance;
      }
    });

    return data;
  };

  const fetchUnclaimedAgeAnalysisData = async () => {
    try {
      const response = await fetch(`${API_URL}/income/`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const result = await response.json();
      console.log('Fetched response:', result);
      
      const categorized = processTransactions(result);
      setCategorizedData(categorized);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUnclaimedAgeAnalysisData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}> {/* Fixed width for Sidebar */}
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
        <h2 className="mb-4" style={{ marginTop: 15}}>Unclaimed Benefits Age Analysis</h2>
          <div style={{ overflowX: "auto" }}>
            {categorizedData ? (
              <table className="table table-bordered">
                <tbody>
                  {Object.keys(categorizedData)
                    .filter((category) => categorizedData[category].count > 0)
                    .map((category) => (
                      <React.Fragment key={category}>
                        <tr>
                          <td rowSpan="2">{categorizedData[category].label}</td>
                          <td>No. of Members</td>
                          <td>{categorizedData[category].count}</td>
                        </tr>
                        <tr>
                          <td>Amount</td>
                          <td>{categorizedData[category].totalBalance}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinUnclaimedBenefitsAgeAnalysis;
