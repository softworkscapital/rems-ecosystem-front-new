import React from "react";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import TopNav from "./component/TopNav";

const FinDebtorsAgeAnalysis = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "300px" }}> {/* Fixed width for Sidebar */}
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Header 1</th>
                  <th>Header 2</th>
                  <th>Header 3</th>
                  <th>Header 4</th>
                  <th>Header 5</th>
                  <th>Header 6</th>
                  <th>Header 7</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{`Row ${rowIndex + 1}, Col 1`}</td>
                    <td>{`Row ${rowIndex + 1}, Col 2`}</td>
                    <td>{`Row ${rowIndex + 1}, Col 3`}</td>
                    <td>{`Row ${rowIndex + 1}, Col 4`}</td>
                    <td>{`Row ${rowIndex + 1}, Col 5`}</td>
                    <td>{`Row ${rowIndex + 1}, Col 6`}</td>
                    <td>{`Row ${rowIndex + 1}, Col 7`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinDebtorsAgeAnalysis;