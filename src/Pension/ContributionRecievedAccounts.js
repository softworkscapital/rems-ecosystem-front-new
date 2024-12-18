// src/components/PlanContributions.js
import React, { useState } from "react";
import Sidebar from "./component/SideBar";
import TopNav from "./component/TopNav";
import PlanCards from "./component/PlanCards";
import "../../src/assets/css/sb-admin-2.css";

const ContributionsRecievedAccounts = () => {
  
  const plans = [
    {
      id: 1,
      name: "Plan A",
      contributions: [
        { name: "Alice", balance: 1200, date: "2023-11-01" },
        { name: "Bob", balance: 800, date: "2023-11-05" },
      ],
    },
    {
      id: 2,
      name: "Plan B",
      contributions: [
        { name: "Charlie", balance: 1500, date: "2023-11-02" },
        { name: "David", balance: 900, date: "2023-11-06" },
      ],
    },
    {
      id: 3,
      name: "Plan C",
      contributions: [
        { name: "Eva", balance: 2000, date: "2023-11-03" },
        { name: "Frank", balance: 700, date: "2023-11-07" },
      ],
    },
  ];

  const [selectedPlanId, setSelectedPlanId] = useState(plans[0].id);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  const handlePlanChange = (e) => {
    setSelectedPlanId(Number(e.target.value));
  };

  const filteredContributions = selectedPlan.contributions.filter(
    (contribution) => {
      const contributionDate = new Date(contribution.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return (
        (!fromDate || contributionDate >= from) &&
        (!toDate || contributionDate <= to)
      );
    }
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          <div className="container mt-5">
            <h2>Contributions Recived Accounts</h2>
            <div>
              <PlanCards />
            </div>
            <div
              className="form-group mb-4"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label htmlFor="planSelect" style={{ marginRight: "10px" }}>
                Select Plan:
              </label>
              <select
                id="planSelect"
                className="form-control mr-2"
                value={selectedPlanId}
                onChange={handlePlanChange}
                style={{ marginRight: "10px", flex: "1" }} // Adjust width as needed
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>

              <label htmlFor="fromDate" style={{ marginRight: "10px" }}>
                From Date:
              </label>
              <input
                type="date"
                id="fromDate"
                className="form-control mr-2"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{ marginRight: "10px", flex: "1" }} // Adjust width as needed
              />

              <label htmlFor="toDate" style={{ marginRight: "10px" }}>
                To Date:
              </label>
              <input
                type="date"
                id="toDate"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{ flex: "1" }} // Adjust width as needed
              />
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Balance</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContributions.map((contribution, index) => (
                      <tr key={index}>
                        <td>{contribution.name}</td>
                        <td>{contribution.balance}</td>
                        <td>{contribution.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionsRecievedAccounts;
