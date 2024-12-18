import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register all necessary components
Chart.register(...registerables);

// Set default font family and color to mimic Bootstrap's default styling
Chart.defaults.font.family =
  'Nunito, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
Chart.defaults.color = "#858796";

const Contribution = ({ totalContributions, requiredAmount }) => {
  // Calculate remaining contributions
  const remainingAmount = requiredAmount - totalContributions;

  // Prepare the data for the chart
  const data = {
    labels: ["Contributed", "Remaining"],
    datasets: [
      {
        data: [totalContributions, remainingAmount],
        backgroundColor: ["Green", "orange"], // Green for contributed, orange for remaining
        hoverBackgroundColor: ["#2e59d9", "#2e59d9"], // Darker shades for hover
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255, 255, 255)",
      bodyFontColor: "blue", // Set tooltip text color to blue
      borderColor: "#dddfeb",
      borderWidth: 1,
      padding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    plugins: {
      legend: {
        display: true, // Display legend for clarity
      },
    },
    cutout: "50%", // This is the equivalent of cutoutPercentage in Chart.js v3+
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          Contributions Donut Chart
        </h6>
      </div>
      <div className="card-body" style={{ height: "340px", overflowY: "auto" }}>
        <div className="chart-doughnut pt-1" style={{ position: "relative", height: "100%", width: "100%" }}>
          <Doughnut data={data} options={options} />
        </div>
        <div className="text-center mt-4">
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
};

export default Contribution;