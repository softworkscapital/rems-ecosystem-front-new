import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";

const PayrollControlAccount = () => {
  const [allowanceData, setAllowanceData] = useState([]);
  const [deductionData, setDeductionData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch allowance data
        const allowanceResponse = await fetch(
          `${API_URL}/hr_allowance_run_totals`
        );
        const allowanceJson = await allowanceResponse.json();
        setAllowanceData(allowanceJson);

        // Fetch deduction data
        const deductionResponse = await fetch(
          `${API_URL}/hr_deduction_run_totals`
        );
        const deductionJson = await deductionResponse.json();
        setDeductionData(deductionJson);

        // Debugging: Check fetched data
        console.log("Allowance Data:", allowanceJson);
        console.log("Deduction Data:", deductionJson);

        // Combine data based on allowance_id
        const combined = allowanceJson.map((allowance) => {
          const relatedDeductions = deductionJson.filter(
            (deduction) => deduction.allowance_id === allowance.allowance_id
          );
          return {
            ...allowance,
            deductions: relatedDeductions,
          };
        });
        setCombinedData(combined);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: "950px", marginLeft: "280px", marginTop: "25px" }}>
        <h1>Control Account</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">Control Account Details</h2>
            <div className="card-body">
              <div
                className="table-responsive"
                style={{
                  overflowY: "auto",
                  maxHeight: "400px",
                  maxWidth: "1000px",
                }}
              >
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Allowance Run Total ID</th>
                      <th>Allowance Type ID</th>
                      <th>Payroll Cycle Run ID</th>
                      <th>Company ID</th>
                      <th>Allowance Total</th>
                      <th>Allowance Type</th>
                      <th>Deduction Run Total ID</th>
                      <th>Deduction Total</th>
                      <th>Deduction Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allowanceData.map((item) => (
                      // item.deductions.length > 0 ? (
                      //   item.deductions.map(deduction => (
                      <tr key={item.hr_allowance_run_total_id}>
                        <td>{item.allowance_id}</td>
                        <td>{item.payroll_cycle_run_id}</td>
                        <td>{item.company_id}</td>
                        <td>{item.allowance_total}</td>
                        <td>{item.allowance_type}</td>
                      </tr>
                    ))}

{deductionData.map((item) => (
                      // item.deductions.length > 0 ? (
                      //   item.deductions.map(deduction => (
                      <tr key={item.hr_allowance_run_total_id}>
                        <td>{item.allowance_id}</td>
                        <td>{item.payroll_cycle_run_id}</td>
                        <td>{item.company_id}</td>
                        <td>{item.allowance_total}</td>
                        <td>{item.allowance_type}</td>
                      </tr>
                    ))}





                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PayrollControlAccount;
