import React, { useEffect, useState } from "react";
import Sidebar from "./component/SideBar";
import TopNav from "./component/TopNav";
import { API_URL, UPLOADS_API_URL } from "./component/config";

const DisplayInvestmentAssets = () => {
  const [appraisals, setAppraisals] = useState([]);
  const [selectedAppraisalId, setSelectedAppraisalId] = useState(null);
  const [selectedAppraisal, setSelectedAppraisal] = useState(null);
  const [userAuthLevel, setUserAuthLevel] = useState(3); // 1: Level 1, 2: Level 2, 3: Level 3

  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        const response = await fetch(
          `${API_URL}/fin_acc_purchase_investment_assets_appraisal`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appraisals");
        }
        const data = await response.json();
        console.log(data);
        setAppraisals(data);
        if (data.length > 0) {
          const defaultAppraisal = data[0];
          setSelectedAppraisalId(
            defaultAppraisal.fin_acc_purchase_investment_assets_appraisal_id
          );
          setSelectedAppraisal(defaultAppraisal);
        }
      } catch (error) {
        console.error("Error fetching appraisals:", error);
      }
    };

    fetchAppraisals();
  }, []);

  const handleAppraisalChange = (e) => {
    const appraisalId = parseInt(e.target.value, 10);
    setSelectedAppraisalId(appraisalId);
    const appraisal = appraisals.find(
      (app) =>
        app.fin_acc_purchase_investment_assets_appraisal_id === appraisalId
    );
    setSelectedAppraisal(appraisal);
  };

  const handleAuthorization = async (level) => {
    if (!selectedAppraisal) return;

    const appraisalId =
      selectedAppraisal.fin_acc_purchase_investment_assets_appraisal_id;
    const userId = localStorage.getItem("user");

    try {
      let response;
      if (level === 1) {
        response = await fetch(`${API_URL}/authorized/${appraisalId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
      } else if (level === 2) {
        response = await fetch(`${API_URL}/confirmed/${appraisalId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
      }

      if (!response.ok) {
        throw new Error("Authorization failed");
      }

      const result = await response.json();
      alert(`Authorization successful: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error("Error authorizing appraisal:", error);
      alert("Error authorizing appraisal. Please try again.");
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleApprove = async () => {
    if (!selectedAppraisal) return;

    const approvalData = {
      fin_acc_purchase_investment_assets_appraisal_id:
        selectedAppraisal.fin_acc_purchase_investment_assets_appraisal_id,
      asset_class: selectedAppraisal.asset_class,
      type_of_instrument: selectedAppraisal.type_of_instrument,
      name_of_issuer: selectedAppraisal.name_of_issuer,
      date_of_issue: selectedAppraisal.date_of_issue,
      date_of_purchase: selectedAppraisal.date_of_purchase,
      purchase_price: selectedAppraisal.purchase_price,
      face_value_of_investment: selectedAppraisal.face_value_of_investment,
      market_value: selectedAppraisal.market_value,
      intrinsic_value: selectedAppraisal.intrinsic_value,
      future_value_10yrs: selectedAppraisal.future_value_10yrs,
      interest_received: selectedAppraisal.interest_received,
      date_of_purchase: getCurrentDate(),
      fin_acc_purchase_investment_fund_details_id:
        selectedAppraisal.fin_acc_investment_fund_details_id,
    };

    try {
      const response = await fetch(
        `${API_URL}/fin_acc_investment_assets_account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(approvalData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve investment");
      }

      alert("Investment approved successfully!");
    } catch (error) {
      console.error("Error approving investment:", error);
    }
  };

  if (!appraisals.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          <div className="container mt-5">
            <h2 className="text-center">Investment Assets Information</h2>
            <div className="form-group">
              <label htmlFor="appraisalSelect">Select Appraisal:</label>
              <select
                className="form-control"
                id="appraisalSelect"
                onChange={handleAppraisalChange}
                value={selectedAppraisalId || ""}
              >
                {appraisals.map((appraisal) => (
                  <option
                    key={
                      appraisal.fin_acc_purchase_investment_assets_appraisal_id
                    }
                    value={
                      appraisal.fin_acc_purchase_investment_assets_appraisal_id
                    }
                  >
                    {appraisal.name_of_issuer} (
                    {appraisal.fin_acc_purchase_investment_assets_appraisal_id})
                  </option>
                ))}
              </select>
            </div>
            {selectedAppraisal && (
              <div>
                {/* Investment Details Card */}
                <div className="card mb-4 shadow">
                  <div className="card-header">
                    <h3>Investment Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Asset Class:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.asset_class}</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Type of Instrument:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.type_of_instrument}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Name of Issuer:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.name_of_issuer}</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Date of Issue:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.date_of_issue}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Date of Purchase:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.date_of_purchase}</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Maturity Date:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.maturity_date}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Purchase Price:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.purchase_price}</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Face Value:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.face_value_of_investment}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Market Value:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.market_value}</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Intrinsic Value:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.intrinsic_value}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Future Value (10 yrs):</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.future_value_10yrs}</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Dividend Expected:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.interest_received}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>ROI:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.roi}%</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Payback Period:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.payback_period} years</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>IRR:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.irr}%</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>NPV:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.npv}</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Payback:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>${selectedAppraisal.payback}</p>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Key Notes:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <p>{selectedAppraisal.key_notes}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appraisal Recommendations Card */}
                <div className="card mb-4 shadow">
                  <div className="card-header">
                    <h3>Appraisal Recommendations</h3>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <strong>Appraisal 1:</strong>
                        <p>{selectedAppraisal.appraisal_recommendations_1}</p>
                      </div>
                      <div className="col-sm-6">
                        <strong>Appraisal 2:</strong>
                        <p>{selectedAppraisal.appraisal_recommendations_2}</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6">
                        <strong>Appraisal 3:</strong>
                        <p>{selectedAppraisal.appraisal_recommendations_3}</p>
                      </div>
                      <div className="col-sm-6">
                        <strong>Appraisal 4:</strong>
                        <p>{selectedAppraisal.appraisal_recommendations_4}</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <strong>Appraisal 5:</strong>
                      <p>{selectedAppraisal.appraisal_recommendations_5}</p>
                    </div>
                  </div>
                </div>

                {/* Uploaded Reports Card */}
                <div className="card shadow">
                  <div className="card-header">
                    <h3>Uploaded Reports</h3>
                  </div>
                  <div className="card-body">
                    <ul>
                      {selectedAppraisal.investment_assessment_report_url_1 && (
                        <li>
                          Report 1:{" "}
                          <a
                            href={`${UPLOADS_API_URL}/${selectedAppraisal.investment_assessment_report_url_1}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </li>
                      )}
                      {selectedAppraisal.investment_assessment_report_url_2 && (
                        <li>
                          Report 2:{" "}
                          <a
                            href={`${UPLOADS_API_URL}/${selectedAppraisal.investment_assessment_report_url_2}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </li>
                      )}
                      {selectedAppraisal.investment_assessment_report_url_3 && (
                        <li>
                          Report 3:{" "}
                          <a
                            href={`${UPLOADS_API_URL}/${selectedAppraisal.investment_assessment_report_url_3}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </li>
                      )}
                      {selectedAppraisal.investment_assessment_report_url_4 && (
                        <li>
                          Report 4:{" "}
                          <a
                            href={`${UPLOADS_API_URL}/${selectedAppraisal.investment_assessment_report_url_4}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </li>
                      )}
                      {selectedAppraisal.investment_assessment_report_url_5 && (
                        <li>
                          Report 5:{" "}
                          <a
                            href={`${UPLOADS_API_URL}/${selectedAppraisal.investment_assessment_report_url_5}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Conditional Authorization Buttons */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {userAuthLevel === 1 && (
              <button
                className="btn btn-primary"
                onClick={() => handleAuthorization(1)}
              >
                Authorize Level 1
              </button>
            )}
            {userAuthLevel === 2 && (
              <button
                className="btn btn-secondary"
                onClick={() => handleAuthorization(2)}
              >
                Authorize Level 2
              </button>
            )}
            {userAuthLevel === 3 && (
              <button
                className="btn btn-danger"
                onClick={() => handleAuthorization(3)}
              >
                Authorize Level 3
              </button>
            )}
            <button className="btn btn-success" onClick={handleApprove}>
              Approve Investment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayInvestmentAssets;
