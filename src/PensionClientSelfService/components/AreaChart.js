// src/components/AreaChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register all necessary components
Chart.register(...registerables);

const AreaChart = () => {
  // Prepare the data for the chart
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      //   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      //   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      //   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Earnings",
        lineTension: 0.1,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 1,
        pointBorderWidth: 2,
        data: [
          0, 0, 2000, 4000, 6000, 0,
          //   15000, 25000, 20000, 30000, 25000, 40000,
          //   0, 10000, 5000, 15000, 10000, 20000,
          //   15000, 25000, 20000, 30000, 25000, 40000,
        ],
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    // layout: {
    //   padding: {
    //     left: 10,
    //     right: 10,
    //     top: 10,
    //     bottom: 0,
    //   },
    // },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 6,
          padding: 10,
          callback: (value) => `$${number_format(value)}`,
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "blue",
        titleMarginBottom: 10,
        titleFontColor: "#6e707e",
        titleFontSize: 14,
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: "index",
        caretPadding: 10,
        callbacks: {
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label || "";
            return `${datasetLabel}: $${number_format(tooltipItem.raw)}`;
          },
        },
      },
    },
  };

  // Number formatting function
  const number_format = (
    number,
    decimals = 0,
    dec_point = ".",
    thousands_sep = ","
  ) => {
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

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Sales</h6>
      </div>
      <div className="card-body">
        <div className="chart-area">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
