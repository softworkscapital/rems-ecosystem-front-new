import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const DeductionTypes = () => {
  const [deductionTypes, setDeductionTypes] = useState([]);

  useEffect(() => {
    const fetchDeductionTypes = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_deduction_types`);
        const data = await response.json();
        setDeductionTypes(data);
      } catch (err) {
        console.error("Error fetching deduction types:", err.message);
      }
    };

    fetchDeductionTypes();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Deduction Types</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Deduction Types 
              <div style={{ float: "right" }}>
                <Link className="btn btn-primary btnAdd" style={{ marginRight: '10px' }} to="/AddDeductionType">
                  Add Deduction Type
                </Link>
                <Link className="btn btn-primary" to="/Deductions">
                  Back
                </Link>
              </div>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Deduction Type ID</th>
                      <th>Company ID</th>
                      <th>Deduction Name</th>
                      <th>Description</th>
                      <th>Deduction Code</th>
                      <th>Cycle Period</th>
                      <th>Rate</th>
                      <th>Charged On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deductionTypes.map((item) => (
                      <tr key={item.hr_deduction_type_id}>
                        <td>{item.hr_deduction_type_id}</td>
                        <td>{item.company_id !== null ? item.company_id : 'N/A'}</td>
                        <td>{item.deduction_name}</td>
                        <td>{item.description}</td>
                        <td>{item.deduction_code}</td>
                        <td>{item.cycle_period}</td>
                        <td>{item.rate}</td>
                        <td>{item.charged_on}</td>
                      </tr>
                    ))}
                    {deductionTypes.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center' }}>No deduction types found</td>
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

export default DeductionTypes;