import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { Link } from 'react-router-dom';

const DeductionRuns = () => {
  const [deductionRuns, setDeductionRuns] = useState([]);
  const [deductionTypes, setDeductionTypes] = useState([]);
  const [selectedDeductionTypeId, setselectedDeductionTypeId] = useState(null);  

  // Fetch allowance runs
  useEffect(() => {
    const fetchDeductionRuns = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_deduction_runs`);
        const data = await response.json();
        console.log("Fetched allowance runs data:", data); // Log the fetched data
        setDeductionRuns(data);
      } catch (err) {
        console.error("Error fetching allowance runs:", err.message);
      }
    };

    fetchDeductionRuns();
  }, []);

  // Fetch allowance types
  useEffect(() => {
    const fetchDeductionTypes = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_deduction_types`);
        const data = await response.json();
        setDeductionTypes(data);
      } catch (err) {
        console.error("Error fetching allowance types:", err.message);
      }
    };

    fetchDeductionTypes();
  }, []);

  // Function to handle allowance type selection
  const handleDeductionTypeChange = (event) => {
    const id = event.target.value;
    setselectedDeductionTypeId(id === "" ? null : id);
  };

  // Function to handle the back button click
  const handleBackButtonClick = () => {
    setselectedDeductionTypeId(null);
  };

  // Filter allowance runs based on selected ID
  const filteredDeductionRuns = selectedDeductionTypeId
    ? deductionRuns.filter(run => run.deduction_type_id === parseInt(selectedDeductionTypeId))
    : deductionRuns;

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Deduction Runs</h1>

        {/* Dropdown for Allowance Types */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="deductionTypeSelect" style={{ marginRight: '10px' }}>
            Select Deduction Type:
          </label>
          <select id="deductionTypeSelect" value={selectedDeductionTypeId || ''} onChange={handleDeductionTypeChange}>
            <option value="">Select an deduction type</option>
            {deductionTypes.map(type => (
              <option key={type.hr_deduction_type_id} value={type.hr_deduction_type_id}>
                {type.deduction_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Deduction Runs 
              <div style={{ float: "right" }}>
                <Link className="btn btn-primary" to="/Deductions" onClick={handleBackButtonClick}>
                  Back
                </Link>
              </div>
            </h2>

            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Deduction Run ID</th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Surname</th>
                      <th>Deduction Name</th>
                      <th>Deduction Type ID</th>
                      <th>Company ID</th>
                      <th>Payroll Cycle Run ID</th>
                      <th>Username</th>
                      <th>Amount</th>
                      <th>Run Date Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeductionRuns.length > 0 ? (
                      filteredDeductionRuns.map((item) => (
                        <tr key={item.hr_deduction_run_id}>
                          <td>{item.hr_deduction_run_id}</td>
                          <td>{item.employee_id !== null ? item.employee_id : 'N/A'}</td>
                          <td>{item.name !== null ? item.name : 'N/A'}</td>
                          <td>{item.surname !== null ? item.surname : 'N/A'}</td>
                          <td>{item.deduction_name !== null ? item.deduction_name : 'N/A'}</td>
                          <td>{item.deduction_type_id !== null ? item.deduction_type_id : 'N/A'}</td>
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

export default DeductionRuns;