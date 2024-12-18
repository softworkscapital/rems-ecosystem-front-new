import React, { useState, useEffect } from "react";
import Sidebar from "./component/SideBar";
import TopNav from "./component/TopNav";
import { UPLOADS_API_URL } from "./component/config";
import { API_URL } from "./component/config";

const PurchaseInvestmentAssets = () => {
  // State variables for form inputs
  const [fund, setFund] = useState("");
  const [assetType, setAssetType] = useState("");
  const [assetName, setAssetName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [issuer, setIssuer] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseValue, setPurchaseValue] = useState("");
  const [futureValue, setFutureValue] = useState("");
  const [issueMaturity, setIssueMaturity] = useState("");
  const [faceValue, setFaceValue] = useState("");
  const [returnValue, setReturnValue] = useState("");
  const [futureValue10Yrs, setFutureValue10Yrs] = useState("");

  // Additional investment information
  const [dividendExpected, setDividendExpected] = useState("");
  const [roi, setRoi] = useState("");
  const [paybackPeriod, setPaybackPeriod] = useState("");
  const [irr, setIrr] = useState("");
  const [npv, setNpv] = useState("");
  const [payback, setPayback] = useState("");
  const [funds, setFunds] = useState([]);
  // Appraisal recommendations and file uploads
  const [appraisal1Recommendation, setAppraisal1Recommendation] = useState("");
  const [appraisal2Recommendation, setAppraisal2Recommendation] = useState("");
  const [appraisal3Recommendation, setAppraisal3Recommendation] = useState("");
  const [appraisal4Recommendation, setAppraisal4Recommendation] = useState("");
  const [appraisal5Recommendation, setAppraisal5Recommendation] = useState("");
  const [keyNotes, setkeyNotes] = useState("");
  

  const [filePaths, setFilePaths] = useState({
    report1: "",
    report2: "",
    report3: "",
    report4: "",
    report5: "",
  });


  const [investmentList, setInvestmentList] = useState([]);
  useEffect(() => {
    fetchFunds(); // Call function on component mount
  }, []);

  const fetchFunds = async () => {
   
    
    try {

      const response = await fetch(`${API_URL}/fin_acc_investment_fund_details`);
      if (!response.ok) {
        throw new Error("Failed to fetch funds");
      }
      const data = await response.json();
      setFunds(data); // Update state with fetched funds
    } catch (error) {
      // Set error message
    } 
  };

  const assetTypes = ["Stocks", "Bonds", "Real Estate", "Commodities"];

  // Function to upload a single file
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // Use your desired key here

    try {
      const response = await fetch(`${UPLOADS_API_URL}/documents`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Upload result:", result); // Log the result
      return result.path; // Assuming the server returns an object with a 'path' property
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // Handler for file input change
  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const path = await uploadFile(file);
      if (path) {
        setFilePaths((prev) => ({ ...prev, [`report${index}`]: path }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filePaths) {
      const newInvestment = {
        asset_class: assetType,
        type_of_instrument: fund,
        name_of_issuer: issuer,
        date_of_issue: date,
        date_of_purchase: date, // Assuming this is the same as 'date'
        maturity_date: issueMaturity,
        purchase_price: parseFloat(purchasePrice),
        face_value_of_investment: parseFloat(faceValue),
        market_value: parseFloat(purchaseValue),
        intrinsic_value: parseFloat(purchaseValue), // Adjust if necessary
        future_value_10yrs: parseFloat(futureValue10Yrs),
        interest_received: parseFloat(dividendExpected), // Adjust based on your logic
        dividend_received: parseFloat(dividendExpected), // Adjust based on your logic
        investment_location: "", // Add appropriate value if available
        sub_account_1: "", // Add appropriate value if available
        sub_account_2: "", // Add appropriate value if available
        sub_account_3: "", // Add appropriate value if available
        sub_account_4: "", // Add appropriate value if available
        sub_account_5: "", // Add appropriate value if available
        roi: parseFloat(roi),
        payback_period: parseFloat(paybackPeriod),
        irr: parseFloat(irr),
        npv: parseFloat(npv),
        payback: parseFloat(payback),
        key_notes: keyNotes,
        fin_acc_investment_fund_details_id: fund,
        investment_assessment_report_url_1: filePaths.report1,
        investment_assessment_report_url_2: filePaths.report2,
        investment_assessment_report_url_3: filePaths.report3,
        investment_assessment_report_url_4: filePaths.report4,
        investment_assessment_report_url_5: filePaths.report5,
        appraisal_recommendations_1: appraisal1Recommendation,
        appraisal_recommendations_2: appraisal2Recommendation,
        appraisal_recommendations_3: appraisal3Recommendation,
        appraisal_recommendations_4: appraisal4Recommendation,
        appraisal_recommendations_5: appraisal5Recommendation,
      };

      try {
        const response = await fetch(
          `${API_URL}/fin_acc_purchase_investment_assets_appraisal`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newInvestment),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("Investment successfully added:", result);
        console.log("Investment ", newInvestment);
        setInvestmentList([...investmentList, newInvestment]);
        resetFields();
      } catch (error) {
        console.error("Error posting investment:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };
  const handleUserIDSubmit = async (userId) => {

  }

  const resetFields = () => {
    setAssetName("");
    setAmount("");
    setDate("");
    setFund("");
    setAssetType("");
    setIssuer("");
    setPurchasePrice("");
    setPurchaseValue("");
    setFutureValue("");
    setIssueMaturity("");
    setFaceValue("");
    setReturnValue("");
    setFutureValue10Yrs("");
    setDividendExpected("");
    setRoi("");
    setPaybackPeriod("");
    setIrr("");
    setNpv("");
    setPayback("");
    setAppraisal1Recommendation("");
    setAppraisal2Recommendation("");
    setAppraisal3Recommendation("");
    setAppraisal4Recommendation("");
    setAppraisal5Recommendation("");
    setkeyNotes("");
    setFilePaths({
      report1: "",
      report2: "",
      report3: "",
      report4: "",
      report5: "",
    });
  };

  return (
    <div>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          <div className="container mt-5">
            <h2>Record and Purchase Investment Assets</h2>
            <form onSubmit={handleSubmit} className="mb-4">
              {/* Fund and Asset Type Selection */}
              <div className="form-group">
                <label htmlFor="fund">Select Fund:</label>
                <select
                  className="form-control"
                  id="fund"
                  value={fund}
                  onChange={(e) => setFund(e.target.value)}
                  required
                >
                  <option value="">Select a fund</option>
                  {funds.map((f, index) => (
                    <option key={index} value={f.investment_fund_details_id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="card" style={{ padding: "20px" }}>
                <div className="form-group">
                  <label htmlFor="assetType">Select Asset Type:</label>
                  <select
                    className="form-control"
                    id="assetType"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    required
                  >
                    <option value="">Select an asset type</option>
                    {assetTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Investment Details */}
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="issuer">Issuer:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="issuer"
                      value={issuer}
                      onChange={(e) => setIssuer(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="purchasePrice">Purchase Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="purchasePrice"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="purchaseValue">Purchase Value:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="purchaseValue"
                      value={purchaseValue}
                      onChange={(e) => setPurchaseValue(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="futureValue">Future Value:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="futureValue"
                      value={futureValue}
                      onChange={(e) => setFutureValue(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="issueMaturity">Issue Maturity:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="issueMaturity"
                      value={issueMaturity}
                      onChange={(e) => setIssueMaturity(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="faceValue">Face Value:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="faceValue"
                      value={faceValue}
                      onChange={(e) => setFaceValue(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="returnValue">Return Value:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="returnValue"
                      value={returnValue}
                      onChange={(e) => setReturnValue(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="futureValue10Yrs">
                      Future Value (10 yrs):
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="futureValue10Yrs"
                      value={futureValue10Yrs}
                      onChange={(e) => setFutureValue10Yrs(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Investment Information Section */}
              <div className="card" style={{ padding: "20px" }}>
                <h3>Additional Investment Information</h3>
                <div className="form-group">
                  <label htmlFor="dividendExpected">Dividend Expected:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="dividendExpected"
                    value={dividendExpected}
                    onChange={(e) => setDividendExpected(e.target.value)}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="roi">ROI:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="roi"
                      value={roi}
                      onChange={(e) => setRoi(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="paybackPeriod">Payback Period:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="paybackPeriod"
                      value={paybackPeriod}
                      onChange={(e) => setPaybackPeriod(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="irr">IRR:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="irr"
                      value={irr}
                      onChange={(e) => setIrr(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="npv">NPV:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="npv"
                      value={npv}
                      onChange={(e) => setNpv(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="payback">Payback:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="payback"
                    value={payback}
                    onChange={(e) => setPayback(e.target.value)}
                  />
                </div>
              </div>

              {/* Appraisal Reports Section */}
              <div className="card" style={{ padding: "20px" }}>
                <h3>Appraisal Reports</h3>
                <div className="form-group">
                  <label htmlFor="appraisal1Recommendation">
                    Appraisal 1 Recommendation:
                  </label>
                  <textarea
                    className="form-control"
                    id="appraisal1Recommendation"
                    value={appraisal1Recommendation}
                    onChange={(e) =>
                      setAppraisal1Recommendation(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appraisal2Recommendation">
                    Appraisal 2 Recommendation:
                  </label>
                  <textarea
                    className="form-control"
                    id="appraisal2Recommendation"
                    value={appraisal2Recommendation}
                    onChange={(e) =>
                      setAppraisal2Recommendation(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="appraisal3Recommendation">
                    Appraisal 3 Recommendation:
                  </label>
                  <textarea
                    className="form-control"
                    id="appraisal3Recommendation"
                    value={appraisal3Recommendation}
                    onChange={(e) =>
                      setAppraisal3Recommendation(e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="appraisal3Recommendation">
                    Appraisal 4 Recommendation:
                  </label>
                  <textarea
                    className="form-control"
                    id="appraisal3Recommendation"
                    value={appraisal4Recommendation}
                    onChange={(e) =>
                      setAppraisal4Recommendation(e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="appraisal3Recommendation">
                    Appraisal 5 Recommendation:
                  </label>
                  <textarea
                    className="form-control"
                    id="appraisal3Recommendation"
                    value={appraisal5Recommendation}
                    onChange={(e) =>
                      setAppraisal5Recommendation(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="keyNotes">key Notes:</label>
                  <textarea
                    className="form-control"
                    id="keyNotes"
                    value={keyNotes}
                    onChange={(e) => setkeyNotes(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="investmentAssessmentReport1">
                    Investment Assessment Report 1:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="investmentAssessmentReport1"
                    onChange={(e) => handleFileChange(e, 1)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="investmentAssessmentReport2">
                    Investment Assessment Report 2:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="investmentAssessmentReport2"
                    onChange={(e) => handleFileChange(e, 2)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="investmentAssessmentReport3">
                    Investment Assessment Report 3:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="investmentAssessmentReport3"
                    onChange={(e) => handleFileChange(e, 3)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="investmentAssessmentReport4">
                    Investment Assessment Report 4:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="investmentAssessmentReport4"
                    onChange={(e) => handleFileChange(e, 4)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="investmentAssessmentReport5">
                    Investment Assessment Report 5:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="investmentAssessmentReport5"
                    onChange={(e) => handleFileChange(e, 5)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Add Investment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvestmentAssets;
