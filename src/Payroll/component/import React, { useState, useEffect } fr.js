import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const PaySlips = () => {
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
    <div className="container">
      <div className="payslip-container">
        <div className="header">
          <img src="ghana-flag.png" alt="Ghana Flag" className="flag" />
          <h1>Ghana Manufacturing</h1>
          <p>PO Box 40, Tema, Ghana</p>
        </div>
        <h2>Payslip for the period of January 2022</h2>
        <div className="employee-info">
          <div className="row">
            <div className="col">
              <p><strong>Employee Id:</strong> 0987</p>
              <p><strong>Department:</strong> Operations</p>
              <p><strong>Days Worked:</strong> 20.0</p>
            </div>
            <div className="col">
              <p><strong>Name:</strong> Charles Boateng</p>
              <p><strong>Designation:</strong> Operations Administration</p>
              <p><strong>Days Absent:</strong> 0.0</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p><strong>Bank Name, Branch:</strong> GCB Bank Limited, Accra</p>
              <p><strong>Bank Acc/Cheque Number:</strong> 5141160001526</p>
            </div>
            <div className="col">
              <p><strong>Weekly Off Hours:</strong> 9.00</p>
              <p><strong>Ghana Card No:</strong> 5394267842450614</p>
            </div>
          </div>
        </div>
        <div className="earnings">
          <h3>Earnings</h3>
          <div className="row">
            <div className="col">
              <p><strong>Basic Pay</strong></p>
              <p>14,465.13</p>
            </div>
            <div className="col">
              <p><strong>House Rent Allowance</strong></p>
              <p>1,446.51</p>
            </div>
            <div className="col">
              <p><strong>Dearness Allowance</strong></p>
              <p>2,893.03</p>
            </div>
            <div className="col">
              <p><strong>Responsibility Allowance</strong></p>
              <p>2,169.77</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p><strong>Education Allowance</strong></p>
              <p>1,446.51</p>
            </div>
            <div className="col">
              <p><strong>Attendance Bonus</strong></p>
              <p>289.30</p>
            </div>
            <div className="col">
              <p><strong>Night Allowance</strong></p>
              <p>843.80</p>
            </div>
            <div className="col">
              <p><strong>Overtime Allowance</strong></p>
              <p>3,063.79</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p><strong>Total Earnings (Rounded)</strong></p>
              <p>26,618.00</p>
            </div>
          </div>
        </div>
        <div className="deductions">
          <h3>Deductions</h3>
          <div className="row">
            <div className="col">
              <p><strong>Union Dues</strong></p>
              <p>289.30</p>
            </div>
            <div className="col">
              <p><strong>Welfare Dues</strong></p>
              <p>361.63</p>
            </div>
            <div className="col">
              <p><strong>SSNIT</strong></p>
              <p>795.58</p>
            </div>
            <div className="col">
              <p><strong>Provident Fund</strong></p>
              <p>723.26</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p><strong>Income Tax</strong></p>
              <p>5,888.00</p>
            </div>
            <div className="col">
              <p><strong>Total Deductions (Rounded)</strong></p>
              <p>8,058.00</p>
            </div>
          </div>
        </div>
        <div className="net-pay">
          <p><strong>Net Pay (Rounded)</strong></p>
          <p>18,560.00</p>
        </div>
        <div className="footer">
          <div className="forex-rate">
            <p>Forex Rate: 1 GHS = 1 GHS</p>
          </div>
          <div className="signature">
            <div className="employer-signature">Employer's Signature</div>
            <div className="employee-signature">Employee's Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaySlips;