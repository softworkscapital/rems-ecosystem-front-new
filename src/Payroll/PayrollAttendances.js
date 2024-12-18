import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const AttendanceDetails = () => {
  const [attendanceDetails, setAttendanceDetails] = useState([]);

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_attendances`);
        const data = await response.json();
        console.log("Fetched Attendance Data:", data); // Log the fetched data
        setAttendanceDetails(data);
      } catch (err) {
        console.error("Error fetching attendance details:", err.message);
      }
    };

    fetchAttendanceDetails();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Attendance Details</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Attendance Details 
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/AddAttendance">Add Attendance Detail</Link>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>hr_attendance_id</th>
                      <th>employee_id</th>
                      <th>payroll_cycle_run_id</th>
                      <th>company_id</th>
                      <th>payroll_run_from</th>
                      <th>payroll_run_end</th>
                      <th>expected_days</th>
                      <th>actual_days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceDetails.map((item) => (
                      <tr key={item.hr_attendance_id}>
                        <td>{item.hr_attendance_id}</td>
                        <td>{item.employee_id !== null ? item.employee_id : 'N/A'}</td>
                        <td>{item.payroll_cycle_run_id !== null ? item.payroll_cycle_run_id : 'N/A'}</td>
                        <td>{item.company_id !== null ? item.company_id : 'N/A'}</td>
                        <td>{item.payroll_run_from ? new Date(item.payroll_run_from).toLocaleDateString() : 'N/A'}</td>
                        <td>{item.payroll_run_end ? new Date(item.payroll_run_end).toLocaleDateString() : 'N/A'}</td>
                        <td>{item.expected_days !== null ? item.expected_days : 'N/A'}</td>
                        <td>{item.actual_days !== null ? item.actual_days : 'N/A'}</td>
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

export default AttendanceDetails;