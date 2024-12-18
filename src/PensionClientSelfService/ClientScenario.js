import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaPercentage,
  FaPiggyBank,
} from "react-icons/fa";
import Chart from "react-apexcharts";

const ResultCard = ({ quote, pensionPlan }) => {
  if (!quote)
    return (
      <div className="result-card-placeholder">
        <h3>Calculate Your Pension Plan</h3>
        <p>
          <FaChartLine size={50} />
        </p>
      </div>
    );

  const total = quote.lumpsumPayment;
  const contributedPercentage = (
    (quote.totalContributed / total) *
    100
  ).toFixed(1);
  const returnsPercentage = (
    ((quote.lumpsumPayment - quote.totalContributed) / total) *
    100
  ).toFixed(1);

  const chartOptions = {
    series: [parseFloat(contributedPercentage), parseFloat(returnsPercentage)],
    options: {
      chart: {
        type: "donut",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      colors: ["#4e73df", "#1cc88a"],
      labels: ["Your Contributions", "Investment Returns"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="result-card">
      <h2 className="text-gray-900 font-weight-bold">Your Pension Estimate Results</h2>
      <div className="plan-summary">
        <h5 className="text-success ">Selected Plan: {pensionPlan}<br></br>Expected Annual Return: {quote.expectedReturn}%</h5>
        {/* <p>Expected Annual Return: {quote.expectedReturn}%</p> */}
      </div>

      <div className="results-grid">
        <div
          className="row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="result-card-item">
            <FaMoneyBillWave />
            
            <h3 className="text-gray-900 font-weight-bold">
              $
              {quote.lumpsumPayment.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <h4 className="text-gray-900 font-weight-bold">Lumpsum Payment</h4>
          </div>
          <div className="result-card-item">
            <FaChartLine />
           
            <h3 className="text-gray-900 font-weight-bold">
              $
              {quote.monthlyPayout.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <h4 className="text-gray-900 font-weight-bold">Monthly Payout</h4>
          </div>
        </div>
        <div
          className="row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="result-card-item">
            <FaPercentage />
            
            <h3 className="text-gray-900 font-weight-bold">
              {(
                ((quote.lumpsumPayment - quote.totalContributed) /
                  quote.totalContributed) *
                100
              ).toFixed(2)}
              %
            </h3>
            <h4 className="text-gray-900 font-weight-bold">Return on Investment</h4>
          </div>
          <div className="result-card-item">
            <FaPiggyBank /> 
             <h3 className="text-gray-900 font-weight-bold">
              $
              {quote.totalContributed.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>

            <h4 className="text-gray-900 font-weight-bold">Total Contributed</h4>
          
          </div>
        </div>
      </div>

      <div className="chart-container">
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
          height={400}
        />
      </div>
    </div>
  );
};




const ClientScenerio = () => {
  const [retirementDate, setRetirementDate] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");
  const [pensionPlan, setPensionPlan] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pensionPlans = [
    {
      id: 1,
      name: "Conservative Growth Plan",
      description: "Low risk, stable returns (3-5% annually)",
      riskLevel: "Low",
    },
    {
      id: 2,
      name: "Balanced Growth Plan",
      description: "Moderate risk, balanced returns (5-8% annually)",
      riskLevel: "Medium",
    },
    {
      id: 3,
      name: "Aggressive Growth Plan",
      description: "Higher risk, potentially higher returns (8-12% annually)",
      riskLevel: "High",
    },
    {
      id: 4,
      name: "Guaranteed Income Plan",
      description: "Fixed returns with guaranteed pension (4% annually)",
      riskLevel: "Very Low",
    },
    {
      id: 5,
      name: "Index-Linked Plan",
      description: "Returns linked to market indices (Variable)",
      riskLevel: "Medium-High",
    },
  ];

  const handleQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      const selectedPlanDetails = pensionPlans.find(
        (plan) => plan.name === pensionPlan
      );
      let rateOfReturn;

      switch (selectedPlanDetails?.riskLevel) {
        case "Low":
          rateOfReturn = 0.04;
          break;
        case "Medium":
          rateOfReturn = 0.065;
          break;
        case "High":
          rateOfReturn = 0.1;
          break;
        case "Very Low":
          rateOfReturn = 0.04;
          break;
        case "Medium-High":
          rateOfReturn = 0.08;
          break;
        default:
          rateOfReturn = 0.05;
      }

      const years = parseInt(yearsOfService);
      const monthlyAmount = parseInt(monthlyContribution);

      const monthlyRate = rateOfReturn / 12;
      const numberOfPayments = years * 12;
      const futureValue =
        (monthlyAmount * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
        monthlyRate;

      const lumpsumPayment = futureValue;
      const monthlyPayout = lumpsumPayment / (years * 12);

      setQuote({
        lumpsumPayment,
        monthlyPayout,
        expectedReturn: rateOfReturn * 100,
        totalContributed: monthlyAmount * years * 12,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <ProfileCard />
        <div className="calculator-results-container">
          <div className="calculator-container">
            <h2>Pension Plan Calculator</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuote();
              }}
              className="calculator-form"
            >
              <div className="form-group">
                <label>Retirement Date</label>
                <input
                  type="date"
                  value={retirementDate}
                  onChange={(e) => setRetirementDate(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Years of Active Service</label>
                <input
                  type="number"
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(e.target.value)}
                  className="form-input"
                  min="1"
                  max="50"
                  required
                />
              </div>

              <div className="form-group">
                <label>Pension Product Plan</label>
                <select
                  value={pensionPlan}
                  onChange={(e) => setPensionPlan(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Select a plan</option>
                  {pensionPlans.map((plan) => (
                    <option key={plan.id} value={plan.name}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Monthly Contribution ($)</label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="form-input"
                  min="100"
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Calculating..." : "Get Quote"}
              </button>
            </form>
          </div>

          <div className="results-container">
            <ResultCard quote={quote} pensionPlan={pensionPlan} />
          </div>
        </div>
      </div>

      <style>
        {`
          .app-container {
            display: flex;
            min-height: 100vh;
            background: #f8f9fc;
          }

          .main-content {
            flex: 1;
            padding: 2rem;
            display: flex;
            flex-direction: column;
          }

          .calculator-results-container {
            display: flex;
            gap: 2rem;
            flex: 1;
          }

          .calculator-container,
          .results-container {
            background: white;
            border-radius: 15px;
            padding: 1rem;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            flex: 1;
            height: 600px; /* Fixed height */
            overflow-y: auto; /* Enable scroll */
          }

          .results-container {
            display: flex;
            flex-direction: column;
          }

          .result-card-placeholder {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-align: center;
          }

          .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
            justifyContent: "space-between"
          }

         .result-card-item {
           background: white;
           border-radius: 10px;
           padding: 2rem; /* Increased padding for a larger look */
           text-align: center;
           box-shadow: 0 0 20px rgba(0,0,0,0.15); /* Slightly stronger shadow for more depth */
           min-width: 100px; /* Set a minimum width */
           width: 50%; /* Make it responsive */
           margin: 1rem 0; /* Add vertical spacing between items */
          }

          .chart-container {
            margin: 2rem 0;
            padding: 1rem;
            background: #f8f9fc;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default ClientScenerio;
