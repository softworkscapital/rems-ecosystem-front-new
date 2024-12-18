import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";

const PensionBlank = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_employees`);
        const data = await response.json();
        setEmployeeDetails(data);
      } catch (err) {
        console.error("Error fetching employee details:", err.message);
      }
    };

    fetchEmployeeDetails();
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <TopNav />
        <SideBar />
      </div>
      <div className="card" style={{ width: "950px", height:"1200px", marginLeft: "280px", marginTop: "100px" }}>
        <h3>PensionBlank</h3>
        <div className="col-xl-12">


          <div className="card" style={{ width: "250px", marginTop: "25px" }}>
            
            <h5 >$200 USD</h5>
            <h6 >Investment Fund</h6>
          </div>

          <div className="card" style={{ width: "250px", marginTop: "25px" }}>
            
            <h5 >$200 USD</h5>
            <h6 >Investment Fund</h6>
          </div>






        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PensionBlank;
