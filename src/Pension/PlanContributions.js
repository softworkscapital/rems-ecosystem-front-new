import React, { useEffect, useState } from "react";
import Sidebar from "./component/SideBar";
import TopNav from "./component/TopNav";
import "../../src/assets/css/sb-admin-2.css";
import Swal from "sweetalert2";

const PlanContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredContributions, setFilteredContributions] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`http://localhost:3011/pension_products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch plans. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!selectedPlanId) return; // Prevent fetching if no plan is selected

      try {
        const response = await fetch(
          `http://localhost:3009/income/${selectedPlanId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setContributions(data);
      } catch (error) {
        console.error("Error fetching contributions:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch contributions. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchContributions();
  }, [selectedPlanId]);

  useEffect(() => {
    const filterContributions = () => {
      if (!startDate && !endDate) {
        setFilteredContributions(contributions);
        return;
      }

      const filtered = contributions.filter((item) => {
        const datePaid = new Date(item.datepaid);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const isAfterStart = start ? datePaid >= start : true;
        const isBeforeEnd = end ? datePaid <= end : true;

        return isAfterStart && isBeforeEnd;
      });

      setFilteredContributions(filtered);
    };

    filterContributions();
  }, [contributions, startDate, endDate]);

  const handlePlanChange = (e) => {
    setSelectedPlanId(e.target.value);
    setContributions([]);
    setFilteredContributions([]);
    setStartDate(""); // Reset date filters
    setEndDate(""); // Reset date filters
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}>
          <Sidebar />
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            marginTop: "80px",
            marginLeft: "20px", // Add margin to prevent overlap
            overflow: "auto", // Enable scrolling if content is too long
          }}
        >
          <div className=" mb-4" style={{ marginBottom: "20px", padding: "10px", zIndex: 1 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "10px 0" }}>
                {plans.map((plan) => (
                  <div
                    key={plan.pension_product_id}
                    className="card border-left-success shadow h-100 py-2 mx-2"
                    style={{ display: "inline-block", minWidth: "200px", marginRight: "10px" }}
                  >
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            {plan.product_name}
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {/* ${plan.total_amount.toLocaleString()} Make sure the field exists */}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card shadow mb-4" style={{ padding: "20px" }}>
            <h2>Contribution</h2>
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Payment Overview</h6>
              <div className="form-row align-items-end">
                <div className="form-group col-md-4">
                  <label htmlFor="planSelect">Select Plan:</label>
                  <select
                    id="planSelect"
                    className="form-control"
                    value={selectedPlanId}
                    onChange={handlePlanChange}
                  >
                    <option value="">-- Select a Plan --</option>
                    {plans.map((plan) => (
                      <option
                        key={plan.pension_product_id}
                        value={plan.pension_product_id}
                      >
                        {plan.product_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-body" align="left">
              <table className="table">
                <thead>
                  <tr>
                    <th>Transaction Reference</th>
                    <th>Date Paid</th>
                    <th>Description</th>
                    <th>Folio</th>
                    <th>Sub Acc 1</th>
                    <th>Sub Acc 2</th>
                    <th>Sub Acc 3</th>
                    <th>Sub Acc 4</th>
                    <th>Amount (USD)</th>
                    <th>Balance</th>
                    <th>Contribution Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContributions.map((item) => (
                    <tr key={item.fin_acc_revenue_accounts_id}>
                      <td>{item.txn_reference}</td>
                      <td>{new Date(item.datepaid).toLocaleString()}</td>
                      <td style={{ align: "Left" }}>
                        <div>{item.description}</div>
                        <small>
                          <div className="text-gray-600">
                            Paid {item.value}.{item.currency}@ rate 1 :{" "}
                            {item.rate_to_usd} USD
                          </div>
                          <div className="text-gray-600">
                            Company Contribution:{" "}
                            {item.company_contribution_amount || 0}{" "}
                            {item.currency}
                          </div>
                          <div className="text-gray-600">
                            Member Contribution:{" "}
                            {item.member_contribution_amount || 0}{" "}
                            {item.currency}
                          </div>
                        </small>
                      </td>
                      <td>{item.folio || " "}</td>
                      <td>{item.sub_account_1 || " "}</td>
                      <td>{item.sub_account_2 || " "}</td>
                      <td>{item.sub_account_3 || " "}</td>
                      <td>{item.sub_account_4 || " "}</td>
                      <td>{item.debit.toLocaleString()} USD</td>
                      <td>
                        {item.balance ? item.balance.toLocaleString() : " "}
                      </td>
                      <td>
                        {item.total_paid_contributions
                          ? item.total_paid_contributions.toLocaleString()
                          : " "}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.confirmed === "0" ? "bg-success" : "bg-danger"
                          }`}
                          style={{ borderRadius: "12px", padding: "5px 10px" }}
                        >
                          {item.months_behind === "0" ? "Confirmed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanContributions;