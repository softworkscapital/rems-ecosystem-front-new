import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";
import logo from "./logo.svg";

const PayrollPaySlips = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [allowanceRecords, setAllowanceRecords] = useState([]);
  const [deductionRecords, setDeductionRecords] = useState([]);

  useEffect(() => {
    const fetchPayrollRecords = async () => {
      try {
        const response = await fetch(
          `${API_URL}/hr_payroll_runs/joinedEmployeeAndRoles`
        );
        const data = await response.json();
        setPayrollRecords(data);
      } catch (err) {
        console.error("Error fetching payroll records:", err.message);
      }
    };

    const fetchAllowanceRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_allowance_runs`);
        const data = await response.json();
        setAllowanceRecords(data);
      } catch (err) {
        console.error("Error fetching allowance records:", err.message);
      }
    };

    const fetchDeductionRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_deduction_runs`);
        const data = await response.json();
        setDeductionRecords(data);
      } catch (err) {
        console.error("Error fetching deduction records:", err.message);
      }
    };

    fetchPayrollRecords();
    fetchAllowanceRecords();
    fetchDeductionRecords();
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: "950px", marginLeft: "280px", marginTop: "25px" }}>
        <h1>Timekeeping Records</h1>
        <div className="col-xl-12">
          <div
            className="card"
            style={{
              border: "1px solid blue",
              padding: "20px",
              width: "100%",
              maxWidth: "950px",
            }}
          >
            <h2 className="card-header">Pay Slips</h2>
            <div className="card-body">
              {payrollRecords.length === 0 ? (
                <div>No pay slips available.</div>
              ) : (
                payrollRecords.map((item) => (
                  <div
                    key={item.hr_payroll_run_id}
                    className="mb-3"
                    style={{ border: "1px solid grey", padding: "20px" }}
                  >
                    <h3>Payroll Run ID: {item.hr_payroll_run_id}</h3>
                    <div className="row">
                      {/* Image Section */}
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img src={logo} alt="Logo" height="100" width="100" />
                      </div>

                      {/* First Text Section */}
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Full Names:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.name}</span>
                            <span>&nbsp;</span>
                            <span>{item.surname}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Title:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.role}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>National Id:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.idnumber}</span>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Paid Days Off:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.paid_days_off} Days</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Absent Days:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.absent_days} Days</span>
                          </div>
                        </div>
                      </div>

                      {/* Second Text Section */}
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Company ID:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.company_id}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Employee ID:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.employee_id}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Pay Date:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.pay_date}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Pay Period Date:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.pay_period_start_date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="row col-md-12 mt-4" align="left">
                      {/* Earnings Section */}
                      <div
                        className="col-md-6"
                        style={{ padding: "20px", backgroundColor: "#f9f9f9" }}
                      >
                        <div className="row col-md-12">
                          <strong>Earnings</strong>
                        </div>
                        {allowanceRecords.length === 0 ? (
                          <div>No Earnings</div>
                        ) : (
                          <div className="row">
                            {allowanceRecords.map((allowanceItem, index) => (
                              <React.Fragment key={index}>
                                <div className="col-md-6">
                                  {allowanceItem.allowance_name}
                                </div>
                                <div className="col-md-6">
                                  {allowanceItem.amount}
                                </div>
                                {(index + 1) % 2 === 0 && (
                                  <div className="w-100"></div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                        <hr />
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Total Earnings(Rounded):</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.gross_income}</span>
                          </div>
                        </div>
                        <hr />
                      </div>

                    

                      {/* Deductions Section */}
                      <div
                        className="col-md-6"
                        style={{
                          borderLeft: "solid",
                          borderwidth: "2px",
                          padding: "20px",
                          backgroundColor: "#f1f1f1",
                        }}
                      >
                        <div className="row col-md-12">
                          <strong>Deductions</strong>
                        </div>
                        {deductionRecords.length === 0 ? (
                          <div>No Deductions</div>
                        ) : (
                          <div className="row">
                            {deductionRecords.map((deductionItem, index) => (
                              <React.Fragment key={index}>
                                <div className="col-md-6">
                                  {deductionItem.deduction_name}
                                </div>
                                <div className="col-md-6">
                                  {deductionItem.amount}
                                </div>
                                {(index + 1) % 2 === 0 && (
                                  <div className="w-100"></div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        )}

                        <hr />
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong>Deduction Total:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.gross_income}</span>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-md-6" align="left">
                            <strong> Net Pay:</strong>
                          </div>
                          <div className="col-md-6" align="left">
                            <span>{item.net_income}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />

                    {/* Bank Information Section */}
                    <div className="row col-md-12 mt-4" align="left">
                      <div className="col-md-12">
                        <div className="col-md-12">
                          <strong>Bank Name:</strong> {item.bank_name}
                        </div>
                        <div className="col-md-12">
                          <strong>Account Name:</strong> {item.acc_name}
                        </div>
                        <div className="col-md-12">
                          <strong>Account Number:</strong> {item.acc_number}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PayrollPaySlips;
