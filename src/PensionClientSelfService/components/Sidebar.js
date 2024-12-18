import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage which dropdown is open

  const toggleDropdown = (item) => {
    setOpenDropdown((prev) => (prev === item ? null : item)); // Toggle dropdown
  };

  return (
    <ul
      className="navbar-nav bg-gradient-success sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon">
        <i className="fas fa-piggy-bank"></i>
        </div>
        <div className="sidebar-brand-text mx-3">REMS</div>
      </a>
      {/* Nav Item - Dashboard */}
      <li className="nav-item">
        <Link className="nav-link" to="/Home">
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/ClientProfile">
      
          <span>My Profile</span>
        </Link>
      </li>

      {/* Additional Nav Items */}
      <li className="nav-item">
        <Link className="nav-link" to="/ClientContribution">
        
          <span>My Contributions</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/ClientPayouts">
       
          <span>My Payouts</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/ClientScenerio">
        
          <span>Scenario Analysis</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/ClientFeedBack">
       
          <span>FeedBack</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/ClientFAQ">
       
          <span>FAQ</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/ClientAbout">
        
          <span>About</span>
        </Link>
      </li>

      {/* Logout */}
      <li className="nav-item">
        <Link className="nav-link" to="/logout">
        
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
