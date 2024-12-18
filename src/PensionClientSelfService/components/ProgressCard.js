// src/components/ProgressCard.js
import React from 'react';

const ProgressCard = () => {
  const progressData = [
    { label: "Tasks", value: 50, color: "info" },
    { label: "Projects", value: 75, color: "success" },
    { label: "Completed", value: 30, color: "warning" },
    { label: "Pending", value: 20, color: "danger" },
    { label: "Reviews", value: 60, color: "primary" },
    
    
  ];

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Progress Overview</h6>
      </div>
      <div className="card-body">
        {progressData.map((item, index) => (
          <div key={index} className="col mr-2 mb-3">
            <div className={`text-xs font-weight-bold text-${item.color} text-uppercase mb-1`}>
              {item.label}
            </div>
            <div className="row no-gutters align-items-center">
              <div className="col-auto">
                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                  {item.value}%
                </div>
              </div>
              <div className="col">
                <div className="progress progress-sm mr-2">
                  <div
                    className={`progress-bar bg-${item.color}`}
                    role="progressbar"
                    style={{ width: `${item.value}%` }}
                    aria-valuenow={item.value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressCard;