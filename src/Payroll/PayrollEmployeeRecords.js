import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const PayrollEmployeeRecords = () => {
  const [employeeRecords, setEmployeeRecords] = useState([]);

  useEffect(() => {
    const fetchEmployeeRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_employee_records`);
        const data = await response.json();
        setEmployeeRecords(data);
      } catch (err) {
        console.error("Error fetching employee records:", err.message);
      }
    };

    fetchEmployeeRecords();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Employee Records</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Employee Records 
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/AddEmployeeRecord">Add Employee Record</Link>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Record ID</th>
                      <th>Employee ID</th>
                      <th>Company ID</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Record Type</th>
                      <th>Created By</th>
                      <th>Approved By</th>
                      <th>File Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeRecords.map((item) => (
                      <tr key={item.hr_employee_record_id}>
                        <td>{item.hr_employee_record_id}</td>
                        <td>{item.employee_id}</td>
                        <td>{item.company_id !== null ? item.company_id : 'N/A'}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.time}</td>
                        <td>{item.record_type}</td>
                        <td>{item.created_by}</td>
                        <td>{item.approved_by}</td>
                        <td>{item.file_location ? item.file_location : 'N/A'}</td>
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

export default PayrollEmployeeRecords;