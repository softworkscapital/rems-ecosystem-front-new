import React, { useState, useEffect } from "react";
import Sidebar from "./component/SideBar";
import TopNav from "./component/TopNav";
import { API_URL } from "./component/config";

const InvestmentFunds = () => {
  const [selectedInvestment, setSelectedInvestment] = useState("");
  const [investmentDetails, setInvestmentDetails] = useState(null);
  const [investments, setInvestments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/fin_acc_investment_fund_details`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch investments");
        }
        const data = await response.json();
        setInvestments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const handleInvestmentChange = (event) => {
    const selectedId = event.target.value;
    setSelectedInvestment(selectedId);
    const investment = investments.find(
      (inv) => inv.investment_fund_details_id === parseInt(selectedId)
    );
    setInvestmentDetails(investment || null);
  };

  const addInvestmentPlan = () => {
    alert("Functionality to add an investment plan is not implemented yet.");
  };
  const authorizeInvestment = async (level) => {
    if (!investmentDetails) return;
    const userId = localStorage.getItem("user");
    try {
      const response = await fetch(
        `${API_URL}/fin_acc_investment_fund_details/authorized_by_${level}/${investmentDetails.investment_fund_details_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );
  
      // Check if the response is OK
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorDetails;
  
        // If the content type is JSON, parse it
        if (contentType && contentType.includes("application/json")) {
          errorDetails = await response.json();
        } else {
          const errorText = await response.text();
          console.error("Received non-JSON response:", errorText);
          throw new Error("Failed to authorize investment. Please check the server response.");
        }
  
        throw new Error(errorDetails.message || "Failed to authorize investment");
      }
  
      const result = await response.json();
      alert(result.message);
  
      // Reload the page after successful approval
      window.location.reload();
      
    } catch (error) {
      console.error("Error authorizing investment:", {
        level,
        investmentId: investmentDetails.investment_fund_details_id,
        error: error.message,
      });
      setError("An error occurred while authorizing the investment. Please try again.");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
        <div
          className="container-fluid"
          style={{ flex: 1, padding: "20px", marginTop: "80px" }}
        >
          <h1 className="h3 mb-4 text-gray-800">Investment Selector</h1>
          {loading ? (
            <p>Loading investments...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="investmentSelect">Select an Investment</label>
                <select
                  id="investmentSelect"
                  className="form-control"
                  onChange={handleInvestmentChange}
                  value={selectedInvestment}
                >
                  <option value="">Select an Investment</option>
                  {investments.map((investment) => (
                    <option
                      key={investment.investment_fund_details_id}
                      value={investment.investment_fund_details_id}
                    >
                      {investment.name}
                    </option>
                  ))}
                </select>
              </div>

              {investmentDetails ? (
                <div className="card p-5">
                  <p>
                    <strong>Plan:</strong> {investmentDetails.name}
                  </p>
                  <p>
                    <strong>Purpose:</strong> {investmentDetails.purpose}
                  </p>
                  <p>
                    <strong>Created By:</strong> {investmentDetails.created_by}
                  </p>
                  <p>
                    <strong>Created Date:</strong>{" "}
                    {investmentDetails.created_date}
                  </p>
                  <p>
                    <strong>Authorised By 1:</strong>{" "}
                    {investmentDetails.authorised_by_1}
                  </p>
                  <p>
                    <strong>Authorised By 2:</strong>{" "}
                    {investmentDetails.authorised_by_2}
                  </p>
                  <p>
                    <strong>Authorised By 3:</strong>{" "}
                    {investmentDetails.authorised_by_3}
                  </p>
                  <p>
                    <strong>Bank ID:</strong>{" "}
                    {investmentDetails.bank_id || "N/A"}
                  </p>
                </div>
              ) : (
                <p>Please select an investment to see the details.</p>
              )}

              {investmentDetails &&
                investmentDetails.authorised_by_2 ===
                  "waiting authorisation" && (
                  <button
                    className="btn btn-warning ml-2"
                    onClick={() => authorizeInvestment(2)}
                  >
                    Department Authorize Investment
                  </button>
                )}
              {investmentDetails &&
                investmentDetails.authorised_by_3 ===
                  "waiting authorisation" && (
                  <button
                    className="btn btn-warning ml-2"
                    onClick={() => authorizeInvestment(3)}
                  >
                    Executive Authorize Investment
                  </button>
                )}

              <button
                className="btn btn-primary ml-2"
                onClick={addInvestmentPlan}
              >
                Add Investment Plan
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentFunds;
