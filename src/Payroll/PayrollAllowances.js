import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const PayrollAllowances = () => {
  const [allowanceRegisters, setAllowanceRegisters] = useState([]);

  useEffect(() => {
    const fetchAllowanceRegisters = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_allowance_registers`);
        const data = await response.json();
        setAllowanceRegisters(data);
      } catch (err) {
        console.error("Error fetching allowance registers:", err.message);
      }
    };

    fetchAllowanceRegisters();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        
        {/* Heading Section */}
        <div style={{ textAlign: 'center', marginBottom: '5px' }}> {/* Reduced margin bottom */}
          <h2 style={{ color: '#333', marginTop: '0' }}>Allowance Registers</h2> {/* Removed margin top */}
        </div>

        {/* Button Section */}
        <div style={{ textAlign: 'center', marginBottom: '10px', padding: '10px' }}> {/* Adjusted margins */}
          <h2 className="card-header" style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>
            Allowance Register 
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}> {/* Reduced margin top */}
            <Link className="btn btn-primary btnAdd" style={{ marginRight: '10px' }} to="/AddAllowance">
              Add Allowance Register
            </Link>
            <Link className="btn btn-primary" style={{ marginRight: '10px' }} to="/allowancerun">
              Allowance Run
            </Link>
            <Link className="btn btn-primary" to="/allowancetype">
              Allowance Type
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
                      <th>Allowance Register ID</th>
                      <th>Allowance Name</th>
                      <th>Employee ID</th>
                      <th>Company ID</th>
                      <th>Begin Date</th>
                      <th>End Date</th>
                      <th>Max Allowance</th>
                      <th>Current Allowance</th>
                      <th>Remaining Allowance</th>
                      <th>Created By</th>
                      <th>Created Date</th>
                      <th>Created Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allowanceRegisters.map((item) => (
                      <tr key={item.hr_allowance_register_id}>
                        <td>{item.hr_allowance_register_id}</td>
                        <td>{item.allowance_name}</td>
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

export default PayrollAllowances;