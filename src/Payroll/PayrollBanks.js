import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const PayrollankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);

  useEffect(() => {
    

    const fetchBankDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_banks`);
        const data = await response.json();
        setBankDetails(data);
      } catch (err) {
        console.error("Error fetching bank details:", err.message);
      }
    };

   
    fetchBankDetails();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
      <h1>Bank Details</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Bank Details 
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/AddBankDetail">Add Bank Detail</Link>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Bank ID</th>
                      <th>Employee ID</th>
                      <th>Bank Name</th>
                      <th>Account Name</th>
                      <th>Account Number</th>
                      <th>Branch Name</th>
                      <th>Branch Code</th>
                      <th>SWIFT Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankDetails.map((bank) => (
                      <tr key={bank.hr_bank_id}>
                        <td>{bank.hr_bank_id}</td>
                        <td>{bank.employee_id}</td>
                        <td>{bank.bank_name}</td>
                        <td>{bank.acc_name}</td>
                        <td>{bank.acc_number !== null ? bank.acc_number : 'N/A'}</td>
                        <td>{bank.branch_name}</td>
                        <td>{bank.branch_code}</td>
                        <td>{bank.swift_code}</td>
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

export default PayrollankDetails;