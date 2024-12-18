import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const AllowanceRuns = () => {
  const [allowanceRuns, setAllowanceRuns] = useState([]);
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [selectedAllowanceTypeId, setSelectedAllowanceTypeId] = useState(null);
  const [selectedAllowanceDetails, setSelectedAllowanceDetails] = useState(null);

  // Fetch allowance runs
  useEffect(() => {
    const fetchAllowanceRuns = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_allowance_runs`);
        const data = await response.json();
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
        const response = await fetch(`${API_URL}/hr_allowance_types`); // Adjust endpoint as needed
        const data = await response.json();
        setAllowanceTypes(data);
      } catch (err) {
        console.error("Error fetching allowance types:", err.message);
      }
    };

    fetchAllowanceTypes();
  }, []);

  // Fetch details for the selected allowance type
  const handleAllowanceTypeChange = async (event) => {
    const id = event.target.value;
    setSelectedAllowanceTypeId(id);

    if (id) {
      try {
        const response = await fetch(`${API_URL}/hr_allowance_types/${id}`); // Ensure this endpoint is correct
        const data = await response.json();
        setSelectedAllowanceDetails(data);
      } catch (err) {
        console.error("Error fetching allowance type details:", err.message);
      }
    } else {
      setSelectedAllowanceDetails(null);
    }
  };

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
            Select Allowance Type ID:
          </label>
          <select id="allowanceTypeSelect" value={selectedAllowanceTypeId || ''} onChange={handleAllowanceTypeChange}>
            <option value="">Select an allowance type ID</option>
            {allowanceTypes.map(type => (
              <option key={type.hr_allowance_type_id} value={type.hr_allowance_type_id}>
                {type.hr_allowance_type_id}
              </option>
            ))}
          </select>
        </div>

        {/* Display details for selected allowance type */}
        {selectedAllowanceDetails ? (
          <div className="card">
            <h2 className="card-header">Allowance Type Details</h2>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Allowance ID</th>
                      <th>Allowance Name</th>
                      <th>Allowance Description</th>
                      <th>Allowance Code</th>
                      <th>Rate</th>
                      <th>Charged On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedAllowanceDetails.hr_allowance_type_id}</td>
                      <td>{selectedAllowanceDetails.allowance_name}</td>
                      <td>{selectedAllowanceDetails.allowance_description}</td>
                      <td>{selectedAllowanceDetails.allowance_code}</td>
                      <td>{selectedAllowanceDetails.rate}</td>
                      <td>{selectedAllowanceDetails.charged_on}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        ) : (
          // Show the allowance runs table if no allowance type ID is selected
          <div className="col-xl-12">
            <div className="card">
              <h2 className="card-header">
                Allowance Runs 
                <div style={{ float: "right" }}>
                  <Link className="btn btn-primary btnAdd" style={{ marginRight: '10px' }} to="/addallowancerun">
                    Add Allowance Run
                  </Link>
                  <Link className="btn btn-primary" to="/Allowances">
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
                        <th>Allowance ID</th>
                        <th>Company ID</th>
                        <th>Payroll Cycle Run ID</th>
                        <th>Username</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {integratedData.map((item) => (
                        <tr key={item.hr_allowance_run_id}>
                          <td>{item.hr_allowance_run_id}</td>
                          <td>{item.employee_id || 'N/A'}</td>
                          <td>{item.allowance_id || 'N/A'}</td>
                          <td>{item.company_id !== null ? item.company_id : 'N/A'}</td>
                          <td>{item.payroll_cycle_run_id || 'N/A'}</td>
                          <td>{item.username || 'N/A'}</td>
                          <td>{item.amount || 'N/A'}</td>
                        </tr>
                      ))}
                      {allowanceRuns.length === 0 && (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center' }}>No records found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default AllowanceRuns;