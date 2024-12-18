import React from "react";
import { Line } from "react-chartjs-2"; // Ensure you have installed react-chartjs-2 and chart.js
import equityImg from "../component/images/equity.png"; // Ensure these paths are correct
import commoditiesImg from "../component/images/commodities.jpeg"; // Ensure these paths are correct
import realestateImg from "../component/images/realestate.png"; // Ensure these paths are correct
import cashImg from "../component/images/cash.png"; // Ensure these paths are correct

const InvestmentProfileCard = ({ user = {}, investmentData = {} }) => {
  // Default values for user information
  const {
    firstName = "Tanaka",
    lastName = "Doe",
    investmentAmount = 60, // Example investment amount (in percentage)
    profession = "Software Engineer",
    company = "Tech Solutions",
  } = user;
console.log("investmentData",investmentData);

  // Determine the image based on the asset class
  let picture;
  if (investmentData.asset_class === 'Equity') {picture = commoditiesImg};
  if (investmentData.asset_class === 'Real Estate') {picture = realestateImg};
  if (investmentData.asset_class === 'Cash & Eqivalances') {picture = cashImg};
  if (investmentData.asset_class === 'Futures') {picture = equityImg};
  if (investmentData.asset_class === 'Derivatives') {picture = equityImg};
  if (investmentData.asset_class === 'Alternative Investments') {picture = equityImg};
  if (investmentData.asset_class === 'Commodities') {picture = commoditiesImg};



 

  // Extract daily, monthly, and yearly sums from investmentData
  const dailyData = Array.from({ length: 31 }, (_, i) => investmentData[`bi_sum_day${i + 1}_balance`]);
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

  // Data for the daily graph
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
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };



  // Data for the monthly graph
  const monthlyChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

  // Data for the yearly graph
  const yearlyChartData = {
    labels: [
      "2021", "2022", "2023", "2024", "2025", "2026",
      "2027", "2028", "2029", "2030",
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

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: false,
  //       },
  //       ticks: {
  //         beginAtZero: true,
  //         stepSize: 50,
  //         max: Math.max(...monthlyData) + 100,
  //       },
  //     },
  //   },
  // };

  return (
    <div className="card shadow mb-4 p-3" style={{ background: "white" }}>
      <div className="row col-md-12" >
      <div className="row col-md-12" align="left" >
      <h4>{"Asset | "}{investmentData.asset_class}{" : "}{" Serial INVST "}{investmentData.account_id}<br></br>{investmentData.acc_account_name}</h4></div>
        <div className="card-body d-flex align-items-start">

          <div className="col-md-3" align="left">

          

            <img
              src={picture}
              alt="User Profile"
              className="img-fluid"
              style={{ width: "350px", height: "200px", borderRadius: "8px" }}
            />
          </div>
          <div className="ml-3 col-md-4" style={{ flex: 1 }}>
         
            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <strong>Name:</strong>
                <span>{investmentData.acc_account_name}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Fund:</strong>
                <span>{investmentData.name}</span>
              </div>  
              <div className="d-flex justify-content-between">
                <strong>Issuer:</strong>
                <span>{investmentData.name_of_issuer}</span>
              </div>  
              
          




              <div className="d-flex justify-content-between">
                <strong>Date Of Purchase:</strong>
                <span>{investmentData.date_of_purchase}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Type Of Asset:</strong>
                <span>{investmentData.date_of_purchase}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Date Of Maturity:</strong>
                <span>{investmentData.maturity_date}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Purchase Price:</strong>
                <span>{investmentData.purchase_price}</span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Market Value:</strong>
                <span><strong>{investmentData.market_value}</strong></span>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Asset Class:</strong>
                <span>{investmentData.asset_class}</span>
              </div>
            </div>
          </div>
          <div className="ml-3 col-md-5" style={{ flex: 1 }}>
           <div style={{ height: "200px" }}>
            <Line data={monthlyChartData} options={options} />
            </div>
          </div>
        </div>
      </div>





      <div className="col-md-12">
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