import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const Deductions = () => {
  const [deductionRegisters, setDeductionRegisters] = useState([]);

  useEffect(() => {
    const fetchDeductionRegisters = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_deduction_registers`);
        const data = await response.json();
        setDeductionRegisters(data);
      } catch (err) {
        console.error("Error fetching deduction registers:", err.message);
      }
    };

    fetchDeductionRegisters();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        
        {/* Heading Section */}
        <div style={{ textAlign: 'center', marginBottom: '5px' }}>
          <h2 style={{ color: '#333', marginTop: '0' }}>Deduction Registers</h2>
        </div>

        {/* Button Section */}
        <div style={{ textAlign: 'center', marginBottom: '10px', padding: '10px' }}>
          <h2 className="card-header" style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>
            Deductions Register 
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Link className="btn btn-primary btnAdd" style={{ marginRight: '10px' }} to="/AddDeduction">
              Add Deductions Register
            </Link>
            <Link className="btn btn-primary" style={{ marginRight: '10px' }} to="/DeductionRun">
              Deductions Run
            </Link>
            <Link className="btn btn-primary" to="/DeductionType">
              Deductions Type
            </Link>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Deduction Register ID</th>
                      <th>Deduction Name</th>
                      <th>Employee ID</th>
                      <th>Company ID</th>
                      <th>Begin Date</th>
                      <th>End Date</th>
                      <th>Max Deduction</th>
                      <th>Current Deduction</th>
                      <th>Remaining Deduction</th>
                      <th>Created By</th>
                      <th>Created Date</th>
                      <th>Created Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deductionRegisters.map((item) => (
                      <tr key={item.hr_deduction_register_id}>
                        <td>{item.hr_deduction_register_id}</td>
                        <td>{item.deduction_name}</td>
                        <td>{item.employee_id}</td>
                        <td>{item.company_id !== null ? item.company_id : 'N/A'}</td>
                        <td>{new Date(item.begin_date).toLocaleDateString()}</td>
                        <td>{new Date(item.end_date).toLocaleDateString()}</td>
                        <td>{item.max}</td>
                        <td>{item.current}</td>
                        <td>{item.remaining}</td>
                        <td>{item.created_by}</td>
                        <td>{new Date(item.created_date).toLocaleDateString()}</td>
                        <td>{item.created_time}</td>
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

export default Deductions;