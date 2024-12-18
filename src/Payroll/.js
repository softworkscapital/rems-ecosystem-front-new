import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const PayScales = () => {
  const [payScales, setPayScales] = useState([]);

  useEffect(() => {
    const fetchPayScales = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_pay_scales`);
        const data = await response.json();
        setPayScales(data);
      } catch (err) {
        console.error("Error fetching pay scales:", err.message);
      }
    };

    fetchPayScales();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Pay Scales</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Pay Scales 
              <Link className="btn btn-primary btnAdd" style={{ float: "right" }} to="/addpayscale">Add Pay Scale</Link>
            </h2>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                <table className="table table-striped table-bordered first">
                  <thead>
                    <tr>
                      <th>Pay Scale ID</th>
                      <th>Grade ID</th>
                      <th>Company ID</th>
                      <th>Standard Hour Rate</th>
                      <th>Overtime Hourly Rate</th>
                      <th>Special Hourly Rate</th>
                      <th>Custom Alpha Rate</th>
                      <th>Custom Beta Rate</th>
                      <th>Custom Theta Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payScales.map((item) => (
                      <tr key={item.hr_pay_scale_id}>
                        <td>{item.hr_pay_scale_id}</td>
                        <td>{item.grade_id}</td>
                        <td>{item.company_id}</td>
                        <td>{item.standard_hour_rate}</td>
                        <td>{item.overtime_hourly_rate}</td>
                        <td>{item.special_hourly_rate}</td>
                        <td>{item.custom_alpha_rate}</td>
                        <td>{item.custom_beta_rate}</td>
                        <td>{item.custom_theta_rate}</td>
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

export default PayScales;