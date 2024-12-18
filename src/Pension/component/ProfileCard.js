import React from "react";
import { Line } from "react-chartjs-2"; // Ensure you have installed react-chartjs-2 and chart.js
import equityImg from "../component/images/equity.png";
import commoditiesImg from "../component/images/commodities.jpeg";
import realestateImg from "../component/images/realestate.png";
import cashImg from "../component/images/cash.png";

const InvestmentProfileCard = ({ user = {}, investmentData = {} }) => {
  // Default values for user information
  const {
    firstName = "Tanaka",
    lastName = "Doe",
    investmentAmount = 60, // Example investment amount (in percentage)
    profession = "Software Engineer",
    company = "Tech Solutions",
  } = user;

  // Determine the image based on the asset class
  let picture;
  switch (investmentData.asset_class) {
    case "Equity":
      picture = equityImg;
      break;
    case "Real Estate":
      picture = realestateImg;
      break;
    case "Cash & Equivalents":
      picture = cashImg;
      break;
    case "Futures":
    case "Derivatives":
    case "Alternative Investments":
      picture = equityImg;
      break;
    case "Commodities":
      picture = commoditiesImg;
      break;
    default:
      picture = equityImg; // default image if no match
  }

  // Extract daily, monthly, and yearly sums from investmentData
  const dailyData = Array.from(
    { length: 31 },
    (_, i) => investmentData[`bi_sum_day${i + 1}_balance`]
  );
  const monthlyData = [
    investmentData.bi_sum_jan_balance,
    investmentData.bi_sum_feb_balance,
    investmentData.bi_sum_mar_balance,
    investmentData.bi_sum_apr_balance,
    investmentData.bi_sum_may_balance,
    investmentData.bi_sum_jun_balance,
    investmentData.bi_sum_jul_balance,
    investmentData.bi_sum_aug_balance,
    investmentData.bi_sum_sep_balance,
    investmentData.bi_sum_oct_balance,
    investmentData.bi_sum_nov_balance,
    investmentData.bi_sum_dec_balance,
  ];
  const yearlyData = [
    investmentData.bi_sum_2021_balance,
    investmentData.bi_sum_2022_balance,
    investmentData.bi_sum_2023_balance,
    investmentData.bi_sum_2024_balance,
    investmentData.bi_sum_2025_balance,
    investmentData.bi_sum_2026_balance,
    investmentData.bi_sum_2027_balance,
    investmentData.bi_sum_2028_balance,
    investmentData.bi_sum_2029_balance,
    investmentData.bi_sum_2030_balance,
  ];

  // Chart data for daily, monthly, and yearly graphs
  const dailyChartData = {
    labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: "Daily Investment Growth",
        data: dailyData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const monthlyChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Investment Growth",
        data: monthlyData,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const yearlyChartData = {
    labels: [
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
    ],
    datasets: [
      {
        label: "Yearly Investment Growth",
        data: yearlyData,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { display: false },
        ticks: {
          beginAtZero: true,
          stepSize: 50,
          max: Math.max(...monthlyData) + 100,
        },
      },
    },
  };

  return (
    <div className="card shadow mb-4 p-4" style={{ background: "#f8f9fa" }}>
      <div className="row">
        <div className="col-md-4">
          <h3>{`${investmentData.asset_class}: ${investmentData.acc_account_name}`}</h3>
          <img
            src={picture}
            alt="Investment Asset"
            className="img-fluid mb-3"
            style={{ borderRadius: "8px" }}
          />
        </div>
        <div className=" mb-4">
          <div className="header p-2">
            <h6 className="m-0 font-weight-bold text-primary">
              {investmentData.name_of_issuer}
            </h6>
          </div>
          <div className="container">
            {/* General Information Card */}
            <div className="card shadow mb-4">
              <div className="card-header">
                <h6 className="m-0 font-weight-bold text-primary">
                  General Information
                </h6>
              </div>
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Name:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.acc_account_name || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Fund:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.name || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Date Of Purchase:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.date_of_purchase || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Date Of Maturity:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.maturity_date || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information Card */}
            <div className="card shadow mb-4">
              <div className="card-header">
                <h6 className="m-0 font-weight-bold text-primary">
                  Financial Information
                </h6>
              </div>
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Purchase Price:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.purchase_price || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Market Value:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.market_value || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Intrinsic Value:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.intrinsic_value || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Future Value (10 yrs):</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.future_value_10yrs || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Income Information Card */}
            <div className="card shadow mb-4">
              <div className="card-header">
                <h6 className="m-0 font-weight-bold text-primary">
                  Income Information
                </h6>
              </div>
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Interest Received:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.interest_received || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Dividend Received:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.dividend_received || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information Card */}
            <div className="card shadow mb-4">
              <div className="card-header">
                <h6 className="m-0 font-weight-bold text-primary">
                  Additional Information
                </h6>
              </div>
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Investment Location:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.investment_location || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Folio:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.folio || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Company ID:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.company_id || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Branch ID:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.branch_id || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Currency:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.currency || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Sync Status:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.sync_status || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Comment:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.comment || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <strong>Face Value:</strong>
                  </div>
                  <div className="col-md-3" style={{ textAlign: "left" }}>
                    <input
                      type="text"
                      className="form-control"
                      value={investmentData.face_value_of_investment || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h6>Investment Growth Over Time</h6>
          <div style={{ height: "300px" }}>
            <Line data={dailyChartData} options={options} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h6>Monthly Investment Growth</h6>
        <div style={{ height: "300px" }}>
          <Line data={monthlyChartData} options={options} />
        </div>
      </div>

      <div className="mt-4">
        <h6>Yearly Investment Growth</h6>
        <div style={{ height: "300px" }}>
          <Line data={yearlyChartData} options={options} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
          Investment Progress
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${investmentAmount}%` }}
            aria-valuenow={investmentAmount}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="mt-2 text-right">
          <small>{`${100 - investmentAmount}% remaining`}</small>
        </div>
      </div>
    </div>
  );
};

export default InvestmentProfileCard;
