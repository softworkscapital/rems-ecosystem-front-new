// src/Dashboard.js
import React from "react";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import TopNav from "./component/TopNav";
import FinCards from "./component/Fincards";

const FinStatementsMenu = () => {
  const cardsData = [
    { title: "TrialBalance", content: "Trial Balance at the End of Year.", path: "/FinTrialBalance" },
    { title: "Assets Outside Zimbabwe", content: "Overview of assets held outside Zimbabwe.", path: "/FinAssetsOutsideZim" },
    { title: "Sponsoring Employer Contribution Arrears", content: "Details on any outstanding employer contributions.", path: "/FinSponsoringEmployerContributionArrears" },
    { title: "Prescribed Assets Investment Report", content: "Investment report for prescribed assets.", path: "/FinStatementsPrescribedAssetInvestmentReport" },
    { title: "Unclaimed Benefits Age Analysis", content: "Analysis of unclaimed benefits over various age groups.", path: "/FinUnclaimedBenefitsAgeAnalysis" },
    { title: "Debtors Age Analysis", content: "Aging report of debtors.", path: "/FinDebtorsAgeAnalysis" },
    { title: "Membership Statistics", content: "Statistics regarding current members.", path: "/FinMembershipStatistics" },
    { title: "Statement of Net Assets Available For Benefits", content: "Summary of net assets available.", path: "/statement-of-net-assets" },
    { title: "Statement of Changes in Net Assets Available for Benefit", content: "Changes in net assets over the reporting period.", path: "/statement-of-changes-in-net-assets" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}> {/* Fixed width for Sidebar */}
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          <FinCards cardsData={cardsData} /> {/* Pass the data as props */}
        </div>
      </div>
    </div>
  );
};

export default FinStatementsMenu;