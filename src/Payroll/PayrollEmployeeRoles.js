import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const PayrollEmployeeRoles = () => {
  const [employeeRoles, setEmployeeRoles] = useState([]);

  useEffect(() => {
    const fetchEmployeeRoles = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_employee_roles`); // Update this URL as needed
        const data = await response.json();
        setEmployeeRoles(data);
      } catch (err) {
        console.error("Error fetching employee roles:", err.message);
      }
    };

    fetchEmployeeRoles();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Employee Roles</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Employee Roles 
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/AddEmployeeRole">Add Employee Role</Link>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Role ID</th>
                      <th>Company ID</th>
                      <th>Role</th>
                      <th>Name</th>
                      <th>Report To</th>
                      <th>Grade ID</th>
                      <th>Created By</th>
                      <th>Created Date</th>
                      <th>Created Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeRoles.map((item) => (
                      <tr key={item.hr_employee_role_id}>
                        <td>{item.hr_employee_role_id}</td>
                        <td>{item.company_id}</td>
                        <td>{item.role}</td>
                        <td>{item.name}</td>
                        <td>{item.report_to}</td>
                        <td>{item.grade_id}</td>
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

export default PayrollEmployeeRoles;