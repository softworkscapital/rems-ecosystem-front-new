import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const AllowanceTypes = () => {
  const [allowanceTypes, setAllowanceTypes] = useState([]);

  useEffect(() => {
    const fetchAllowanceTypes = async () => {
      try {
        // Fetching allowance types instead of allowance runs
        const response = await fetch(`${API_URL}/hr_allowance_types`);
        const data = await response.json();
        setAllowanceTypes(data);
      } catch (err) {
        console.error("Error fetching allowance types:", err.message);
      }
    };

    fetchAllowanceTypes();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Allowance Types</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Allowance Types 
              <div style={{ float: "right" }}>
                <Link className="btn btn-primary btnAdd" style={{ marginRight: '10px' }} to="/AddAllowanceType">
                  Add Allowance Type
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
                      <th>Allowance Type ID</th>
                      <th>Company ID</th>
                      <th>Allowance Name</th>
                      <th>Allowance Description</th>
                      <th>Allowance Code</th>
                      <th>Cycle</th>
                      <th>Rate</th>
                      <th>Charged On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allowanceTypes.map((item) => (
                      <tr key={item.hr_allowance_type_id}>
                        <td>{item.hr_allowance_type_id}</td>
                        <td>{item.company_id !== null ? item.company_id : 'N/A'}</td>
                        <td>{item.allowance_name}</td>
                        <td>{item.allowance_description}</td>
                        <td>{item.allowance_code}</td>
                        <td>{item.cycle}</td>
                        <td>{item.rate}</td>
                        <td>{item.charged_on}</td>
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

export default AllowanceTypes;