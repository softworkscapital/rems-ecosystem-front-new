// src/Dashboard.js
import React from "react";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import TopNav from "./component/TopNav";


const FinStatementsMenu = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px"}}> {/* Fixed width for Sidebar */}
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          
          <div>
      
          </div>

         


          <div>
        
          </div>
          
          </div>
      </div>
    </div>
  );
};

export default FinStatementsMenu;