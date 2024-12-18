import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

// Set default font family and color to mimic Bootstrap's default styling
Chart.defaults.font.family = 'Nunito, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
Chart.defaults.color = '#858796';

// Number formatting function
const number_format = (number, decimals = 0, dec_point = ".", thousands_sep = ",") => {
  number = (number + "").replace(",", "").replace(" ", "");
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
  const dec = typeof dec_point === "undefined" ? "." : dec_point;
  let s = "";
  const toFixedFix = (n, prec) => {
    const k = Math.pow(10, prec);
    return "" + Math.round(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

const MonthlyContributionsBarChart = () => {
  // Prepare the data for the chart (example data for 7 days)
  const data = {
    labels: [
      "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7",
    ],
    datasets: [
      {
        label: "Contributions",
        backgroundColor: "#0004f7",
        hoverBackgroundColor: "#2e59d9",
        data: [
          2000, 3000, 2500, 4000, 3500, 5000, 4500, // Example contributions data
        ],
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: true,
        },
        ticks: {
          maxTicksLimit: 7,
        },
        maxBarThickness: 25,
      },
      y: {
        min: 0,
        max: 6000, // Adjust as necessary
        ticks: {
          maxTicksLimit: 6,
          padding: 20,
          callback: (value) => `$${number_format(value)}`,
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 000)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2],
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        titleMarginBottom: 10,
        titleFontColor: "purple",
        titleFontSize: 14,
        backgroundColor: "rgb(255, 255, 255)",
        bodyFontColor: "purple",
        borderColor: "#dddfeb",
        borderWidth: 1,
        padding: 15,
        callbacks: {
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label || "";
            return `${datasetLabel}: $${number_format(tooltipItem.raw)}`;
          },
        },
      },
    },
  };

  return (
    <div className="card shadow mb-4" style={{ height: '93%' }}> {/* Reduce the card height */}
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">7-Day Contributions Trend</h6>
      </div>
      <div className="card-body" style={{ height: '200px' }}> {/* Set a specific height for the chart body */}
        <div className="chart-bar" style={{ height: '100%' }}> {/* Ensure the chart takes full height */}
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyContributionsBarChart;