import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const TimeKeepings = () => {
  const [timeKeepingRecords, setTimeKeepingRecords] = useState([]);

  useEffect(() => {
    const fetchTimeKeepingRecords = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_time_keeping`);
        const data = await response.json();
        setTimeKeepingRecords(data);
      } catch (err) {
        console.error("Error fetching timekeeping records:", err.message);
      }
    };

    fetchTimeKeepingRecords();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Timekeeping Records</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Timekeeping Records 
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/AddTimeKeeping">Add Timekeeping Record</Link>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Timekeeping ID</th>
                      <th>Company ID</th>
                      <th>Clock Date</th>
                      <th>Clock In Time</th>
                      <th>Clock Out Time</th>
                      <th>Employee ID</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeKeepingRecords.map((item) => (
                      <tr key={item.hr_time_keeping_id}>
                        <td>{item.hr_time_keeping_id}</td>
                        <td>{item.company_id}</td>
                        <td>{new Date(item.clock_date).toLocaleDateString()}</td>
                        <td>{item.clock_in_time}</td>
                        <td>{item.clock_out_time}</td>
                        <td>{item.employee_id}</td>
                        <td>{item.status}</td>
                        <td>{item.notes ? item.notes : 'N/A'}</td>
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

export default TimeKeepings;