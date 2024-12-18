import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Link } from 'react-router-dom';

const AllowanceRuns = () => {
  const [allowanceRuns, setAllowanceRuns] = useState([]);
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [selectedAllowanceTypeId, setSelectedAllowanceTypeId] = useState(null);  

  // Fetch allowance runs
  useEffect(() => {
    const fetchAllowanceRuns = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_allowance_runs`);
        const data = await response.json();
        console.log("Fetched allowance runs data:", data); // Log the fetched data
        setAllowanceRuns(data);
      } catch (err) {
        console.error("Error fetching allowance runs:", err.message);
      }
    };

    fetchAllowanceRuns();
  }, []);

  // Fetch allowance types
  useEffect(() => {
    const fetchAllowanceTypes = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_allowance_types`);
        const data = await response.json();
        setAllowanceTypes(data);
      } catch (err) {
        console.error("Error fetching allowance types:", err.message);
      }
    };

    fetchAllowanceTypes();
  }, []);

  // Function to handle allowance type selection
  const handleAllowanceTypeChange = (event) => {
    const id = event.target.value;
    setSelectedAllowanceTypeId(id === "" ? null : id);
  };

  // Function to handle the back button click
  const handleBackButtonClick = () => {
    setSelectedAllowanceTypeId(null);
  };

  // Filter allowance runs based on selected ID
  const filteredAllowanceRuns = selectedAllowanceTypeId
    ? allowanceRuns.filter(run => run.allowance_type_id === parseInt(selectedAllowanceTypeId))
    : allowanceRuns;

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Allowance Runs</h1>

        {/* Dropdown for Allowance Types */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="allowanceTypeSelect" style={{ marginRight: '10px' }}>
            Select Allowance Type:
          </label>
          <select id="allowanceTypeSelect" value={selectedAllowanceTypeId || ''} onChange={handleAllowanceTypeChange}>
            <option value="">Select an allowance type</option>
            {allowanceTypes.map(type => (
              <option key={type.hr_allowance_type_id} value={type.hr_allowance_type_id}>
                {type.allowance_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Allowance Runs 
              <div style={{ float: "right" }}>
                <Link className="btn btn-primary" to="/Allowances" onClick={handleBackButtonClick}>
                  Back
                </Link>
              </div>
            </h2>

            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Allowance Run ID</th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Allowance Name</th>
                      <th>Allowance Type ID</th>
                      <th>Company ID</th>
                      <th>Payroll Cycle Run ID</th>
                      <th>Username</th>
                      <th>Amount</th>
                      <th>Rune Date Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllowanceRuns.length > 0 ? (
                      filteredAllowanceRuns.map((item) => (
                        <tr key={item.hr_allowance_run_id}>
                          <td>{item.hr_allowance_run_id}</td>
                          <td>{item.employee_id !== null ? item.employee_id : 'N/A'}</td>
                          <td>{item.name !== null ? item.name : 'N/A'}</td>
                          <td>{item.surname !== null ? item.surname : 'N/A'}</td>
                          <td>{item.allowance_name !== null ? item.allowance_name : 'N/A'}</td>
                          <td>{item.allowance_type_id !== null ? item.allowance_type_id : 'N/A'}</td>
                          <td>{item.company_id !== null ? item.company_id : 'N/A'}</td>
                          <td>{item.payroll_cycle_run_id !== null ? item.payroll_cycle_run_id : 'N/A'}</td>
                          <td>{item.username !== null ? item.username : 'N/A'}</td>
                          <td>{item.amount !== null ? item.amount : 'N/A'}</td>
                          <td>{item.run_date_time !== null ? item.run_date_time : 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center' }}>No records found</td>
                      </tr>
                    )}
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

export default AllowanceRuns;