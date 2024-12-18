import React from "react";

const BeneficiaryList = () => {
  // Hard-coded list of beneficiaries
  const beneficiaries = [
    { name: "John Doe", amount: 100 },
    { name: "Jane Smith", amount: 200 },
    { name: "Michael Johnson", amount: 150 },
    { name: "Emily Davis", amount: 250 },
    { name: "Sarah Brown", amount: 300 },
    { name: "John Doe", amount: 100 },
    { name: "Jane Smith", amount: 200 },
    { name: "Michael Johnson", amount: 150 },
    { name: "Emily Davis", amount: 250 },
    { name: "Sarah Brown", amount: 300 },
  ];

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Beneficiary List</h6>
      </div>
      <div className="card-body" style={{ height: "340px", overflowY: "auto" }}>
        {beneficiaries.length > 0 ? (
          <ul className="list-group">
            {beneficiaries.map((beneficiary, index) => (
              <li key={index} className="list-group-item">
                {beneficiary.name} - ${beneficiary.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No beneficiaries found.</p>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryList;
