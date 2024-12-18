import React from 'react';

const ContributionTable = () => {
  const paymentData = [
    { paymentNumber: "PY#001", date: "2023-11-01", type: "Contribution", amount: 150, status: "Paid" },
    { paymentNumber: "PY#002", date: "2023-11-05", type: "Contribution", amount: 200, status: "Paid" },
    { paymentNumber: "PY#003", date: "2023-11-10", type: "Contribution", amount: 100, status: "Paid" },
    { paymentNumber: "PY#004", date: "2023-11-15", type: "Contribution", amount: 250, status: "Paid" },
    { paymentNumber: "PY#005", date: "2023-11-20", type: "Contribution", amount: 300, status: "Pending" },
  ];

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Payment Overview</h6>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Payment Number</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((item, index) => (
              <tr key={index}>
                <td>{item.paymentNumber}</td>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>${item.amount}</td>
                <td style={{ color: "black" }}>
                  <span
                    className={`badge ${item.status === "Paid" ? "bg-success" : "bg-danger"}`}
                    style={{ borderRadius: "12px", padding: "5px 10px" }}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributionTable;