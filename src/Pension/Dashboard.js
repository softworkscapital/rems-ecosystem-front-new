// src/Dashboard.js
import React from "react";
import AreaChart from "./component/AreaChart";
import BarChart from "./component/BarChart";
import DonutChart from "./component/DonutChart";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import ProgressCard from './component/ProgressCard';
import DashboardCards from './component/DashboardCards';
import ProfileCard from "./component/ProfileCard";
import TopNav from "./component/TopNav";
import DayCollections from "./component/DayCollections";
import DayPayouts from "./component/DayPayouts";
import MonthlyExpectedContributions from "./component/MonthlyExpectedContributions";
import { Container, Row, Col } from 'react-bootstrap';
import DayCollectionsPie from "./component/CollectionsByPlanPie";
import DayPayoutsPie from "./component/ValueCollectionsByCurrencyPie";
import MonthlyExpectedContributionsBarChart from './component/MonthlyContributionsBarChart';
import PayoutsTrend from "./component/PayoutsTrend";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px"}}> {/* Fixed width for Sidebar */}
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          
          <div>
          <Row>
                <Col md={3}>
                    <DayCollections />
                </Col>
                <Col md={3}>
                    <DayPayouts />
                </Col>
                <Col md={6}>
                    <MonthlyExpectedContributions />
                </Col>
            </Row>
          </div>

          <div>
          <Row>
                <Col md={3}>
                    <DayCollectionsPie />
                </Col>
                <Col md={3}>
                    <DayPayoutsPie />
                </Col>
                <Col md={6}>
                    <MonthlyExpectedContributionsBarChart />
                </Col>
            </Row>
          </div>


          <div>
          <Row>
                <Col md={6}>
                    <PayoutsTrend />
                </Col>
        
            </Row>
          </div>
          
          </div>
      </div>
    </div>
  );
};

export default Dashboard;