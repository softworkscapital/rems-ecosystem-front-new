import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import './index.css'; 
// import ProgressBar from './ProgressBar'; 
import { ProgressBar } from "react-bootstrap";

const PayrollBankFilePreView = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchPayrollRecords = async () => {
      try {
        const response = await fetch(
          `${API_URL}/hr_payroll_runs/joinedEmployeeAndRoles`
        );
        const data = await response.json();
        console.log("data", data);
        setPayrollRecords(data);
      } catch (err) {
        console.error("Error fetching payroll records:", err.message);
      }
    };

    fetchPayrollRecords();
  }, []);

  // Simulating progress for demonstration; you can adjust this logic based on your needs
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10; // Increase progress
        }
        clearInterval(interval);
        return 100; // Ensure it caps at 100%
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Pay Scales</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Transfare Now
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/addpayscale">Preview</Link>
              <Link className="btn btn-danger btnAdd" style={{ float: "right" }} to="/addpayscale">Decline</Link>
              <Link className="btn btn-success btnAdd" style={{ float: "right" }} to="/addpayscale">Authorize</Link>
            </h2>
            <div className="col-md-12">
              <div className="row col-md-12">
                {/* Progress Bar Section */}
                <ProgressBar progress={progress} />
              </div>
            </div>

            <div className="card-body">
              <div className="row col-md-12">
                <div className="card col-md-12" style={{ backgroundColor: '', height: '20px', padding: '20px' }}>
                  <scroll>
                    Net Wage Bill: 89000340 USD
                  </scroll>
                </div>
                <div className="col-md-8">

                </div>
                <div className="scrollable col-md-6">
                  <div className="card">
                    <div className="row">
                      <div className="col-md-12"><strong>Entities Transfares</strong></div>
                      
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">NASSA</div>
                      <div className="col-md-6">15000 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">Fidelity Insurance</div>
                      <div className="col-md-6">32000 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">PAYE</div>
                      <div className="col-md-6">27000 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">ZIMRA</div>
                      <div className="col-md-6">18500 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">GreenField Bank</div>
                      <div className="col-md-6">22000 USD</div>
                    </div>
                  </div>
                </div>


                <div className="scrollable col-md-6">
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6"><strong>Net Transfares</strong></div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">Bank of Agriculture</div>
                      <div className="col-md-6">15000 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">Farmers First Bank</div>
                      <div className="col-md-6">32000 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">AgriFinance</div>
                      <div className="col-md-6">27000 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">EcoBank</div>
                      <div className="col-md-6">18500 USD</div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">GreenField Bank</div>
                      <div className="col-md-6">22000 USD</div>
                    </div>
                  </div>
                </div>
<div>
<div className="scrollable">
                    <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                      
                    <div className="col-md-12"><h4>Employee Salary Transfares</h4></div>
                      <table className="table table-striped table-bordered first">
                        <thead>
                          <tr>
                            <th>name</th>
                            <th>surname</th>
                            <th>bank_name</th>
                            <th>net_income</th>
                            <th>acc_number</th>
                            <th>branch_code</th>
                            <th>branch_name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payrollRecords.map((item) => (
                            <tr key={item.hr_employee_id}>
                              <td>{item.name}</td>
                              <td>{item.surname}</td>
                              <td>{item.bank_name}</td>
                              <td>{item.net_income}</td>
                              <td>{item.acc_number}</td>
                              <td>{item.branch_code}</td>
                              <td>{item.branch_name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

</div>



              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PayrollBankFilePreView;