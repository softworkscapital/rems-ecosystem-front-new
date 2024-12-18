import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const PayrollRecords = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);

  useEffect(() => {
    const fetchPayrollRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_payroll_runs`);
        const data = await response.json();
        setPayrollRecords(data);
      } catch (err) {
        console.error("Error fetching payroll records:", err.message);
      }
    };

    fetchPayrollRecords();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Payroll Records</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Payroll Records 
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/AddPayrollRecord">Add Payroll Record</Link>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Payroll Run ID</th>
                      <th>Employee ID</th>
                      <th>Company ID</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Attended Days</th>
                      <th>Paid Days Off</th>
                      <th>Absent Days</th>
                      <th>Deductions Amount</th>
                      <th>Allowance Amount</th>
                      <th>Gross Income</th>
                      <th>Net Income</th>
                      <th>Overtime Hours</th>
                      <th>Pay Period Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollRecords.map((item) => (
                      <tr key={item.hr_payroll_run_id}>
                        <td>{item.hr_payroll_run_id}</td>
                        <td>{item.employee_id}</td>
                        <td>{item.company_id}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.attended_days}</td>
                        <td>{item.paid_days_off}</td>
                        <td>{item.absent_days}</td>
                        <td>{item.deductions_amount}</td>
                        <td>{item.allowance_amount}</td>
                        <td>{item.gross_income}</td>
                        <td>{item.net_income}</td>
                        <td>{item.overtime_hours}</td>
                        <td>{item.pay_period_start_date ? new Date(item.pay_period_start_date).toLocaleDateString() : 'N/A'}</td>
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

export default PayrollRecords;