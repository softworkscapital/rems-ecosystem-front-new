import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

// Set default font family and color to mimic Bootstrap's default styling
Chart.defaults.font.family = 'Nunito, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
Chart.defaults.color = '#858796';

const ValueCollectionsByCurrencyPie = () => {
  // Prepare the data for the chart
  const data = {
    labels: ['USD', 'ZIG', 'ZAR'],
    datasets: [
      {
        data: [2000, 1200, 800, 400, 450, 780,120, 780,720], // Example data for each currency
        backgroundColor: ['#0004f7','#20bf00','#FFA500','red',  '#CD1DE3', '#FFA500','#059dff', 'gold', '#9e0000'],
        hoverBackgroundColor: ['#2e59d9', '#2c9faf', '#ffbb33'],
        hoverBorderColor: 'rgba(234, 236, 244, 1)',
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: 'rgb(255, 255, 255)',
      bodyFontColor: 'purple',
      borderColor: '#dddfeb',
      borderWidth: 1,
      padding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'start', // Aligns the legend to the start (left)
      },
    },
    cutout: '10%', // This is the equivalent of cutoutPercentage in Chart.js v3+
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Value Collections by Currency</h6> {/* Updated title */}
      </div>
      <div className="card-body">
        <div className="chart-pie pt-3">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ValueCollectionsByCurrencyPie;